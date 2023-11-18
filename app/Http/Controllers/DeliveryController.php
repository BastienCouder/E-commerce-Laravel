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
                    return $this->update($request);
                case 'PATCH':
                    return $this->updateDefaultDeliveryItem($request->deliveryItemId);
                case 'DELETE':
                    return $this->delete($request);
                default:
                    return response(['message' => 'Demande non valide'], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response(['message' => 'Utilisateur non authentifié.'], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function read(Request $request)
    {
        try {
            $user = Auth::user();
            
            if (!$user || !Auth::check()) {
                return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
            }
    
            $delivery = $user->delivery;
    
            if ($delivery) {
                $deliveryItems = $delivery->deliveryItems()->get();
                return response()->json(['delivery' => $delivery, 'deliveryItems' => $deliveryItems]);
            } else {
                return response()->json(['message' => 'Données de livraison non trouvées pour cet utilisateur.'], 404);
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
            if (!$delivery) {
                $delivery = new Delivery();
                $delivery->user()->associate($user);
                $delivery->save();
            }

            $existingDefaultItem = $delivery->deliveryItems()->where('Default', true)->first();

            if ($existingDefaultItem) {
                $existingDefaultItem->update(['Default' => false]);
            }

            $newDefaultItem = new DeliveryItem([
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'address_1' => $request->input('address_1'),
                'address_2' => $request->input('address_2') ?? '',
                'zipcode' => $request->input('zipcode'),
                'country' => $request->input('country'),
                'city' => $request->input('city'),
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
    } catch (\Exception $e) {
        error_log($e->getMessage());
        return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

public function updateDefaultDeliveryItem(Request $request, $deliveryItemId)
{
    try {
        $user = Auth::user();

        if (!$user || !Auth::check()) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        $delivery = $user->delivery;

        if (!$delivery) {
            return response()->json(['message' => 'Livraison non trouvée pour l\'utilisateur'], 404);
        }

        $existingDefaultItem = $delivery->deliveryItems()->where('Default', true)->first();

        if ($existingDefaultItem) {
            $existingDefaultItem->update(['Default' => false]);
            return response()->json(['message' => 'Article par défaut mis à jour avec succès', 'delivery' => $delivery]);
        } else {
            return response()->json(['message' => 'Aucun article par défaut trouvé pour la livraison de l\'utilisateur'], 404);
        }
    } catch (\Exception $e) {
        error_log($e->getMessage());
        return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    public function softDelete($deliveryItemId)
{
    try {
        $deliveryItem = DeliveryItem::find($deliveryItemId);

        if (!$deliveryItem) {
            throw new \Exception("L'objet de la livraison n'a pas été trouvé");
        }

        $delivery = $deliveryItem->delivery;
        $deliveryItem->delete();

        return response()->json(['message' => 'Le moyen de livraison a été supprimé avec succès']);
    } catch (\Exception $e) {
        \Log::error("Erreur lors de la suppression du DeliveryItem : {$e->getMessage()}");

        return response()->json(['message' => $e->getMessage()], 500);
    }
}
}