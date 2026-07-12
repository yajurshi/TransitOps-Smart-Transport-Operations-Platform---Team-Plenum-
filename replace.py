import os
import re

directory = "d:/Hackathons/Odoo Main/TransitOps-Smart-Transport-Operations-Platform---Team-Plenum-/client/src"

replacements = {
    # Names
    "Alex Mercer": "Aarav Patel",
    "John Smith": "Rahul Shah",
    "Sarah Jenkins": "Priya Patel",
    "Bruce Wayne": "Karan Mehta",
    "Liam Neeson": "Rohan Desai",
    "Emily Davis": "Neha Joshi",
    "Michael Brown": "Arjun Patel",
    "David Wilson": "Vivek Shah",
    "Sophia Johnson": "Ananya Trivedi",
    "Daniel Miller": "Harsh Panchal",
    "Development User": "Hency Patel",
    "Jane Doe": "Meera Joshi",
    "Clark Kent": "Devang Patel",
    "Dom Toretto": "Vishal Shah",
    "Diana Prince": "Nisha Desai",
    "Barry Allen": "Jay Patel",
    "Peter Parker": "Chirag Mehta",

    # Locations
    "Houston": "Ahmedabad",
    "Dallas": "Surat",
    "Miami": "Rajkot",
    "Orlando": "Vadodara",
    "Chicago": "Gandhinagar",
    "Detroit": "Bhavnagar",
    "New York": "Jamnagar",
    "Los Angeles": "Bharuch",
    "Seattle": "Anand",
    "Phoenix": "Morbi",
    "Boston": "Vapi",
    "San Francisco": "Gandhidham",
    "Denver": "Mehsana",
    "Aspen": "Palanpur",
    "Philadelphia": "Bhuj",
    "Newark": "Mundra",
    "Portland": "Nadiad",
    
    # Regions
    "North Region": "Ahmedabad Zone",
    "South Region": "Surat Zone",
    "East Region": "Vadodara Zone",
    "West Region": "Rajkot Zone",
    "'North'": "'Ahmedabad Zone'",
    "'South'": "'Surat Zone'",
    "'East'": "'Vadodara Zone'",
    "'West'": "'Rajkot Zone'",
    ">North<": ">Ahmedabad Zone<",
    ">South<": ">Surat Zone<",
    ">East<": ">Vadodara Zone<",
    ">West<": ">Rajkot Zone<",

    # Company Details
    "TransitOps Logistics Inc.": "TransitOps Logistics Pvt. Ltd.",
    "San Francisco, CA": "Gandhinagar, Gujarat",
    "support@transitops.com": "support@transitops.in",
    "www.transitops.com": "www.transitops.in",
    "alex.mercer@transitops.com": "aarav.patel@transitops.in",
    "dev@transitops.com": "hency.patel@transitops.in",
    "+1 (800) 555-0199": "+91-79-4000-1234",
    "+1 (555) 123-4567": "+91 98765 43210",
    "+1 (555) 987-6543": "+91 98250 12345",
    
    # Currency text
    "USD": "INR",

    # Vehicles
    "Heavy Duty Truck": "Tata Ace Gold",
    "Transit Van": "Tata Intra V30",
    "Sedan Courier": "Ashok Leyland Dost+",
    "Heavy Duty Rig": "Mahindra Bolero Pickup",
    "Light Pickup": "Mahindra Supro",
    "Freightliner Cascadia": "Eicher Pro 2049",
    "Volvo VNL": "BharatBenz 1015R",
    "Peterbilt 579": "Ashok Leyland Bada Dost",
    "Kenworth T680": "Tata Ultra T7",
    "Ford Transit": "Eicher Pro 3015",
    "Mercedes Sprinter": "Tata 407",
    
    # License Plates
    "TX-9081": "GJ-01-AB-1234",
    "TX-4322": "GJ-18-CD-9081",
    "NY-7811": "GJ-27-EF-5678",
    "CA-8899": "GJ-05-KL-3210",
    "WA-5561": "GJ-06-MN-8765",
    "FL-2099": "GJ-12-PQ-4567",
    "PA-1102": "GJ-03-RS-8901",
    "CO-9988": "GJ-02-XY-1122",
    "IL-3044": "GJ-09-ZA-3344",
    "GA-2011": "GJ-14-BC-5566",
    "MA-6712": "GJ-10-DE-7788",
    "AZ-4455": "GJ-11-FG-9900",
    
    # Driver Licenses
    "DL-889021": "GJ0120200001234",
    "DL-443211": "GJ0520210045678",
    "DL-100021": "GJ1820190011223",
    "DL-999999": "GJ2720230088990",
    "DL-334211": "GJ0620220055443",
    "DL-201192": "GJ1220180099887",
    "DL-110294": "GJ0320210066778",
    "DL-773322": "GJ0220200044332",
    "DL-552233": "GJ0920170022110",
    "DL-112233": "GJ1420160011009",
    
    # Fuel
    "gal/hr": "L/hr",
    "gal": "L",
    "Gallons": "Litres",
    "gallons": "litres",
    "miles": "km", # Some might have mi or miles. Let's do miles -> km
    "Miles": "Km",
    "mi/gal": "km/L",
    "mpg": "km/L",

    # Date formatting if explicit strings are used (YYYY-MM-DD -> DD-MM-YYYY or similar)
    # the user requested DD/MM/YYYY formatting, we will regex replace that later if needed.
}

def regex_replace(content):
    # $ -> ₹ safely
    content = re.sub(r'\$(?=[0-9])', '₹', content)
    content = re.sub(r'\(\$\)', '(₹)', content)
    content = re.sub(r'>\$<', '>₹<', content)
    
    # A few more dollar sign replacements for components 
    # e.g. `<span className="...">$</span>` -> `...₹...`
    # We replaced `>$<` but let's also do `> $ <` just in case
    content = re.sub(r'>\s*\$\s*<', '>₹<', content)
    
    return content

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            new_content = regex_replace(new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
print("Done.")
