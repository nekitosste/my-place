<?php

namespace App\Http\Controllers;
use App\Models\Address;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request) 
{ 
    $searchQuery = $request->input('query'); 

    $address = Address::where(function($query) use ($searchQuery) { 
        $query->where('name', 'LIKE', "%$searchQuery%") 
              ->orWhere('ip', 'LIKE', "%$searchQuery%") 
              ->orWhere('mac', 'LIKE', "%$searchQuery%") 
              ->orWhere('FIO', 'LIKE', "%$searchQuery%") 
              ->orWhere('place', 'LIKE', "%$searchQuery%"); 
    })->get(); 
   
       return response()->json($address);
    
}
}
