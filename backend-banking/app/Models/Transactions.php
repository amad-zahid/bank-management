<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Balance;

class Transactions extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'users_id', 'transfer_to', 'type', 'amount', 'transaction_date'
    ];

    // public function balance()
    // {
    //   return $this->hasMany(Balance::class);
    // }

}
