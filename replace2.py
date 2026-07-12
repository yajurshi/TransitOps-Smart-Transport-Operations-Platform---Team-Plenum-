import os
import re

directory = "d:/Hackathons/Odoo Main/TransitOps-Smart-Transport-Operations-Platform---Team-Plenum-/client/src"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            
            # Reports.jsx: "'$' +" -> "'₹' +"
            new_content = new_content.replace("'$' +", "'₹' +")
            
            # FuelExpenses.jsx: ">${totalFuelCost" -> ">₹{totalFuelCost"
            # >${ -> >₹{
            # But ONLY in JSX, when it's not a template literal.
            # wait, JSX is `<span>${...}` so it is indeed `>${`
            new_content = re.sub(r'>\$\{', '>₹{', new_content)
            
            # Analytics.jsx: ">${item.cost"
            # Also replaced by the above.
            
            # FinancialDashboardComponents.jsx: "`$${" -> "`₹${"
            new_content = new_content.replace("`$${", "`₹${")
            
            # Any remaining `>$<` or something
            new_content = new_content.replace(">$<", ">₹<")
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
print("Done.")
