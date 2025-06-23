from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["reactdb"]

# ---------- Collection 1: houses ----------
houses_collection = db["houses"]
houses_collection.delete_many({})  # Clear existing data

houses = [
    {
        "title": "Cozy Beachside Cottage",
        "location": "Goa, India",
        "price": 2400,
        "rating": 4.7,
        "description": "A beautiful cottage right on the beach. Perfect for a relaxing vacation.",
        "image": "",
    },
    {
        "title": "Luxury Hilltop Villa",
        "location": "Manali, India",
        "price": 5200,
        "rating": 4.9,
        "description": "Elegant villa with mountain views, hot tub, and modern interiors.",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
        "title": "Modern City Apartment",
        "location": "Bangalore, India",
        "price": 3200,
        "rating": 4.5,
        "description": "A sleek apartment in the heart of the city with all amenities included.",
        "image": "https://images.unsplash.com/photo-1618220179428-22790b461013"
    },
    {
        "title": "Rustic Mountain Cabin",
        "location": "Kasol, India",
        "price": 2800,
        "rating": 4.6,
        "description": "Charming wooden cabin with forest views and cozy interiors.",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    }
]

houses_collection.insert_many(houses)
print("✅ Seeded 'houses' collection successfully!")

# ---------- Collection 2: listing ----------
listing_collection = db["listing"]
listing_collection.delete_many({})  # Clear existing data

listing = [
    {
        "title": "Cozy Beachside Cottage",
        "location": "Goa, India",
        "price": 2400,
        "rating": 4.7,
        "description": "A beautiful cottage right on the beach. Perfect for a relaxing vacation.",
        "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
        "images": [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
        ],
        "amenities": ["Wi-Fi", "Air Conditioning", "Private Beach", "24/7 Support"],
        "offers": {
            "Essentials": [{"label": "Free Wi-Fi"}, {"label": "Air Conditioning"}, {"label": "Smart TV"}],
            "Extras": [{"label": "Private Pool"}, {"label": "Pet Friendly"}, {"label": "Breakfast included"}],
            "Convenience": [{"label": "Self Check-in"}, {"label": "24/7 Support"}, {"label": "Workspace"}]
        },
        "reviews": [
            {"user": "Ananya", "rating": 5, "comment": "Amazing stay with great views!", "date": "Jun 2024"},
            {"user": "Rohan", "rating": 4, "comment": "Perfect location, a bit crowded on weekends.", "date": "May 2024"}
        ]
    },
    {
        "title": "Mountain View Cabin",
        "location": "Manali, India",
        "price": 1800,
        "rating": 4.5,
        "description": "Peaceful cabin with stunning views of the Himalayas.",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        "images": [
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1618220179428-22790b461013"
        ],
        "amenities": ["Wi-Fi", "Heater", "Hiking Trails", "Workspace"],
        "offers": {
            "Essentials": [{"label": "Free Wi-Fi"}, {"label": "Smart TV"}],
            "Extras": [{"label": "Breakfast included"}, {"label": "Pet Friendly"}],
            "Convenience": [{"label": "24/7 Support"}, {"label": "Workspace"}]
        },
        "reviews": [
            {"user": "Priya", "rating": 5, "comment": "Loved waking up to the mountain view!", "date": "Mar 2024"}
        ]
    },
    {
        "title": "City Apartment",
        "location": "Mumbai, India",
        "price": 3200,
        "rating": 4.2,
        "description": "Modern apartment in the heart of Mumbai with all amenities.",
        "image": "https://images.unsplash.com/photo-1618220179428-22790b461013",
        "images": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        ],
        "amenities": ["Wi-Fi", "Air Conditioning", "Gym", "Concierge"],
        "offers": {
            "Essentials": [{"label": "Free Wi-Fi"}, {"label": "Air Conditioning"}, {"label": "Smart TV"}],
            "Extras": [{"label": "Gym Access"}, {"label": "Daily Cleaning"}],
            "Convenience": [{"label": "24/7 Concierge"}, {"label": "Workspace"}]
        },
        "reviews": [
            {"user": "Arjun", "rating": 4, "comment": "Great location and comfortable stay.", "date": "Apr 2024"},
            {"user": "Neha", "rating": 5, "comment": "Perfect for business trips.", "date": "Feb 2024"}
        ]
    },
    {
        "title": "Lakeview Villa",
        "location": "Udaipur, India",
        "price": 5500,
        "rating": 4.9,
        "description": "Luxury villa facing the lake with a private garden.",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "images": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1618220179428-22790b461013"
        ],
        "amenities": ["Wi-Fi", "Garden", "Lake Access", "Self Check-in"],
        "offers": {
            "Essentials": [{"label": "Free Wi-Fi"}, {"label": "Air Conditioning"}],
            "Extras": [{"label": "Private Pool"}, {"label": "Breakfast included"}],
            "Convenience": [{"label": "Self Check-in"}, {"label": "24/7 Support"}]
        },
        "reviews": [
            {"user": "Meera", "rating": 5, "comment": "Best experience ever!", "date": "Feb 2024"},
            {"user": "Sameer", "rating": 4, "comment": "Expensive but worth it.", "date": "Jan 2024"}
        ]
    }
]

listing_collection.insert_many(listing)
print("✅ Inserted full listings into 'listing' collection!")






