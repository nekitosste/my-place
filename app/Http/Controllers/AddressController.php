<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Post;



class AddressController extends Controller
{
    public function create(Request $request)
{
    $address = new Address;
    $address->name = $request->input('name');
    $address->ip = $request->input('ip');
    $address->mac = $request->input('mac');
    $address->FIO = $request->input('FIO');
    $address->place = $request->input('place');
    $address->comment = $request->input('comment');
    $address->save();
    
    
}


public function show($id)
{
    $address = Address::find($id);

    if (!$address) {
        return response()->json(['message' => 'Post not found'], 404);
    }

    return response()->json($address);
}

public function address()
{
    $address = Address::all();
    
    return $address;
}

public function update(Request $request, $id)
{
    $address = Address::find($id);
    $address->name = $request->input('name');
    $address->ip = $request->input('ip');
    $address->mac = $request->input('mac');
    $address->FIO = $request->input('FIO');
    $address->place = $request->input('place');
    $address->comment = $request->input('comment');
    $address->save();

   
}
public function destroy(Request $request, $id)
{
    $address = Address::find($id);

    if (!$address) {
        return response()->json(['message' => 'Post not found'], 404);
    }

    $address->delete();
}

}
