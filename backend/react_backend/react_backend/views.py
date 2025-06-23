from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from bson.objectid import ObjectId
from bson.errors import InvalidId
from .utils.mongo import get_mongo_collection
import json
import re
from datetime import datetime
from django.utils.dateformat import format as date_format



@csrf_exempt
def register_user_view(request):
    """Handles user registration."""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    try:
        body = json.loads(request.body)
        name = body.get('name', '').strip()
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not name or not email or not password:
            return JsonResponse({'error': 'All fields are required'}, status=400)

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return JsonResponse({'error': 'Invalid email format'}, status=400)

        collection = get_mongo_collection('users')

        if collection.find_one({'email': email}):
            return JsonResponse({'error': 'Email is already registered'}, status=409)

        user = {
            'name': name,
            'email': email,
            'password': make_password(password)
        }

        result = collection.insert_one(user)
        return JsonResponse({'message': 'User registered successfully', 'user_id': str(result.inserted_id)}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def login_user_view(request):
    """Handles user login and session creation."""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    try:
        body = json.loads(request.body)
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        collection = get_mongo_collection('users')
        user = collection.find_one({'email': email})

        if not user or not check_password(password, user['password']):
            return JsonResponse({'error': 'Invalid email or password'}, status=401)

        request.session['user_id'] = str(user['_id'])
        request.session['email'] = user['email']
        request.session['name'] = user.get('name', '')

        return JsonResponse({'message': 'Login successful', 'name': user.get('name', '')}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def logout_user_view(request):
    """Logs out the current user."""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    try:
        request.session.flush()
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    except Exception:
        return JsonResponse({'error': 'Logout failed'}, status=500)


def house_items_view(request):
    """Returns all house listings."""
    try:
        collection = get_mongo_collection('houses')
        mongo_data = collection.find({})

        houses = []
        for doc in mongo_data:
            house = {
                "_id": str(doc["_id"]),
                "title": doc.get("title", ""),
                "location": doc.get("location", ""),
                "price": doc.get("price", 0),
                "rating": doc.get("rating", 0),
                "description": doc.get("description", ""),
                "image": doc.get("image", ""),
                "images": doc.get("images", []),
                "amenities": doc.get("amenities", []),
                "offers": doc.get("offers", {}),
                "reviews": doc.get("reviews", [])
            }
            houses.append(house)

        return JsonResponse({"houses": houses}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def listing_detail_view(request, id):
    """Returns a single listing detail by ID."""
    try:
        object_id = ObjectId(id)
        collection = get_mongo_collection('houses')
        listing = collection.find_one({"_id": object_id})

        if not listing:
            return JsonResponse({'error': 'Listing not found'}, status=404)

        images = listing.get("images", [])
        if not images and listing.get("image"):
            images = [listing["image"]]

        result = {
            "_id": str(listing["_id"]),
            "title": listing.get("title", ""),
            "location": listing.get("location", ""),
            "price": listing.get("price", 0),
            "image": listing.get("image", ""),
            "rating": listing.get("rating", 0),
            "description": listing.get("description", ""),
            "amenities": listing.get("amenities", []),
            "offers": listing.get("offers", {}),
            "reviews": listing.get("reviews", []),
            "images": images,
        }

        return JsonResponse(result, status=200)

    except InvalidId:
        return JsonResponse({'error': 'Invalid ID format'}, status=400)
    except Exception:
        return JsonResponse({'error': 'Could not fetch listing details'}, status=500)



@csrf_exempt
def create_booking_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    if not request.session.get('user_id'):
        return JsonResponse({'error': 'Authentication required'}, status=401)

    try:
        body = json.loads(request.body)

        listing_id = body.get('listingId')
        name = body.get('name')
        phone = body.get('phone')
        guests = int(body.get('guests', 1))
        check_in = body.get('checkIn')
        check_out = body.get('checkOut')

        if not all([listing_id, name, phone, check_in, check_out]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        check_in_date = datetime.fromisoformat(check_in.replace("Z", "+00:00"))
        check_out_date = datetime.fromisoformat(check_out.replace("Z", "+00:00"))

        bookings_col = get_mongo_collection('bookings')

        booking = {
            'listing_id': listing_id,
            'user_id': request.session['user_id'],
            'name': name,
            'phone': phone,
            'guests': guests,
            'check_in': check_in_date,
            'check_out': check_out_date,
            'created_at': datetime.utcnow(),
        }

        bookings_col.insert_one(booking)
        return JsonResponse({'message': 'Booking successful'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        import traceback
        print(traceback.format_exc())  # Debug
        return JsonResponse({'error': str(e)}, status=400)


def get_bookings_by_listing(request, listing_id):
    """Fetches all bookings for a specific listing ID."""
    if request.method != "GET":
        return JsonResponse({"error": "Only GET method allowed."}, status=405)

    try:
        collection = get_mongo_collection('bookings')

        # Since you store listing_id as a string, use it directly
        bookings = list(collection.find({"listing_id": listing_id}))

        formatted_bookings = []
        for b in bookings:
            formatted_bookings.append({
                "_id": str(b["_id"]),
                "listing_id": b.get("listing_id", ""),
                "name": b.get("name", ""),
                "phone": b.get("phone", ""),
                "guests": b.get("guests", 1),
                "check_in": b["check_in"].strftime("%Y-%m-%d") if isinstance(b.get("check_in"), datetime) else "",
                "check_out": b["check_out"].strftime("%Y-%m-%d") if isinstance(b.get("check_out"), datetime) else ""
            })

        return JsonResponse({"bookings": formatted_bookings}, safe=False, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)