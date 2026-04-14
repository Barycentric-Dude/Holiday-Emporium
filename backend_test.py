import requests
import sys
import json
from datetime import datetime

class SachinTravelsAPITester:
    def __init__(self, base_url="https://sachin-travels-remix.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check expected fields if provided
                if expected_fields and isinstance(response_data, dict):
                    for field in expected_fields:
                        if field not in response_data:
                            print(f"⚠️  Warning: Expected field '{field}' not found in response")
                        else:
                            print(f"   ✓ Field '{field}' present")
                            
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": response_data
            })

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            expected_fields=["message"]
        )
        return success

    def test_get_tours(self):
        """Test GET /tours endpoint"""
        success, response = self.run_test(
            "Get All Tours",
            "GET",
            "tours",
            200,
            expected_fields=["tours"]
        )
        
        if success and "tours" in response:
            tours = response["tours"]
            print(f"   Found {len(tours)} tours")
            
            # Check if we have 6 tours as expected
            if len(tours) == 6:
                print("   ✓ Correct number of tours (6)")
            else:
                print(f"   ⚠️  Expected 6 tours, found {len(tours)}")
            
            # Check tour structure
            if tours:
                tour = tours[0]
                required_fields = ["id", "title", "duration", "price", "itinerary", "image", "highlights"]
                for field in required_fields:
                    if field in tour:
                        print(f"   ✓ Tour has '{field}' field")
                    else:
                        print(f"   ❌ Tour missing '{field}' field")
        
        return success

    def test_get_single_tour(self):
        """Test GET /tours/{tour_id} endpoint"""
        # First get tours to get a valid ID
        _, tours_response = self.run_test("Get Tours for ID", "GET", "tours", 200)
        
        if "tours" in tours_response and tours_response["tours"]:
            tour_id = tours_response["tours"][0]["id"]
            success, response = self.run_test(
                f"Get Single Tour ({tour_id})",
                "GET",
                f"tours/{tour_id}",
                200,
                expected_fields=["id", "title", "duration", "price"]
            )
            return success
        else:
            print("❌ Cannot test single tour - no tours available")
            return False

    def test_create_lead(self):
        """Test POST /leads endpoint"""
        test_lead = {
            "first_name": "Test",
            "last_name": "User",
            "phone": "+91 9876543210",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "package_interest": "Ashtavinayak Yatra",
            "message": "Test lead submission"
        }
        
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "leads",
            200,
            data=test_lead,
            expected_fields=["success", "message", "lead_id"]
        )
        
        if success and "lead_id" in response:
            self.test_lead_id = response["lead_id"]
            print(f"   ✓ Lead created with ID: {self.test_lead_id}")
        
        return success

    def test_get_leads(self):
        """Test GET /leads endpoint"""
        success, response = self.run_test(
            "Get All Leads",
            "GET",
            "leads",
            200,
            expected_fields=["leads"]
        )
        
        if success and "leads" in response:
            leads = response["leads"]
            print(f"   Found {len(leads)} leads")
            
            if leads:
                lead = leads[0]
                required_fields = ["id", "first_name", "email", "phone", "package_interest", "created_at"]
                for field in required_fields:
                    if field in lead:
                        print(f"   ✓ Lead has '{field}' field")
                    else:
                        print(f"   ❌ Lead missing '{field}' field")
        
        return success

    def test_invalid_tour_id(self):
        """Test GET /tours with invalid ID"""
        success, response = self.run_test(
            "Get Invalid Tour",
            "GET",
            "tours/invalid-id",
            404
        )
        return success

    def test_invalid_lead_data(self):
        """Test POST /leads with invalid data"""
        invalid_lead = {
            "first_name": "",  # Empty required field
            "email": "invalid-email",  # Invalid email
            "phone": "",  # Empty required field
        }
        
        # This should fail validation
        success, response = self.run_test(
            "Create Invalid Lead",
            "POST",
            "leads",
            422  # Expecting validation error
        )
        return success

def main():
    print("🚀 Starting Sachin Travels API Testing...")
    print("=" * 60)
    
    # Setup
    tester = SachinTravelsAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_tours,
        tester.test_get_single_tour,
        tester.test_create_lead,
        tester.test_get_leads,
        tester.test_invalid_tour_id,
        tester.test_invalid_lead_data,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    # Save detailed results
    with open('/workspace/test_reports/backend_api_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": round(tester.tests_passed/tester.tests_run*100, 1)
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/test_reports/backend_api_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())