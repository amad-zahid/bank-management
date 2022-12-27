<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Transactions;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Transactions as TransactionsResource;

class TransactionsController extends BaseController
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transactions::all();

        return $this->sendResponse(TransactionsResource::collection($transactions), 'Transactions retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'users_id' => 'required',
            'transfer_to' => 'required',
            'type' => 'required',
            'amount' => 'required',
            'transaction_date' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $crediter = User::find($request->get('users_id'));

        if ($request->get('type') == 'deposit') {

            $user_new_balance = (int) $crediter->balance + (int) $request->get('amount');

            User::where(['id'=> $crediter->id])->update(['balance' => $user_new_balance]);

            $transactions = Transactions::create($input);

            if ($transactions) {
                return $this->sendResponse(new TransactionsResource($transactions), 'Transaction Created Successfully.');
            }else{
                return $this->sendError('Something Went Wrong');
            }

        }else{
            if ((int)$crediter->balance >= $request->get('amount')) {

                $debiter = User::find($request->get('transfer_to'));

                if ($debiter != '') {

                    $crd_new_balance = (int) $crediter->balance - (int) $request->get('amount');
                    $dbt_new_balance = (int) $debiter->balance + (int) $request->get('amount');

                    User::where(['id'=> $crediter->id])->update(['balance' => $crd_new_balance]);
                    User::where(['id'=> $debiter->id])->update(['balance' => $dbt_new_balance]);

                    $crd_transactions = Transactions::create($input);

                    $input['type'] = 'debited';

                    $dbt_transactions = Transactions::create($input);

                    if ($dbt_transactions) {
                        return $this->sendResponse(new TransactionsResource($crd_transactions), 'Transaction Created Successfully.');
                    }else{
                        return $this->sendError('Something Went Wrong');
                    }

                }else{
                    return $this->sendError('Crediter not Found');
                }

            }else{
                return $this->sendError("You Don't have Sufficient Balance");
            }

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transactions = Transactions::find($id);

        if (is_null($transactions)) {
            return $this->sendError('Transaction not found.');
        }

        return $this->sendResponse(new TransactionsResource($transactions), 'Transaction retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transactions $transactions)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'users_id' => 'required',
            'transfer_to' => 'required',
            'type' => 'required',
            'amount' => 'required',
            'transaction_date' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $transactions->name = $input['name'];
        $transactions->detail = $input['detail'];
        $transactions->save();

        return $this->sendResponse(new TransactionsResource($transactions), 'Transactions updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transactions $transactions)
    {
        $transactions->delete();

        return $this->sendResponse([], 'Transactions deleted successfully.');
    }
}
