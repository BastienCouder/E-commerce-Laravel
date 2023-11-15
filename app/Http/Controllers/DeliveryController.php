<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Delivery;
use App\Models\DeliveryItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeliveryController extends Controller
{
    public function handleRequest(Request $request)
    {
        if (Auth::check()) {
            switch ($request->method()) {
                case 'GET':
                    return $this->read($request);
                case 'POST':
                    return $this->create($request);
                case 'PUT':
                case 'PATCH':
                    return $this->update($request);
                case 'DELETE':
                    return $this->delete($request);
                default:
                    return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function read(Request $request)
    {
        try {
            $user = Auth::user();
            $delivery = $user->delivery;

            if ($delivery) {
                $deliveryItems = $delivery->deliveryItems()->get();
                return response()->json(['delivery' => $delivery, 'deliveryItems' => $deliveryItems]);
            } else {
                return response()->json(['message' => 'Données de livraison non trouvées.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Une erreur s\'est produite.'], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user && Auth::check()) {
                $delivery = $user->delivery;
    
                if ($delivery) {
                    $existingDefaultItem = $delivery->deliveryItems()->where('Default', true)->first();
    
                    if ($existingDefaultItem) {
                        $existingDefaultItem->update(['Default' => false]);
                    }
    
                    $newDefaultItem = new DeliveryItem([
                        'name' => $user->name,
                        'surname' => $user->surname,
                        'email' => $user->email,
                        'tel' => $user->tel,
                        'address_1' => $user->address_1,
                        'address_2' => $user->address_2,
                        'zipcode' => $user->zipcode,
                        'country' => $user->country,
                        'city' => $user->city,
                        'created_by' => $user->id,
                        'updated_by' => $user->id,
                        'Default' => true,
                    ]);
    
                    $newDefaultItem->delivery()->associate($delivery);
                    $newDefaultItem->save();
    
                    return response()->json(['message' => 'Livraison créée avec succès', 'delivery' => $delivery]);
                } else {
                    return response()->json(['message' => 'Livraison non trouvée pour l\'utilisateur'], 404);
                }
            } else {
                return response()->json(['message' => 'Aucune donnée de livraison'], 404);
            }
        } catch (\Exception $e) {
            error_log($e->getMessage());
            error_log("Exception Trace: " . $e->getTraceAsString());
            return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}