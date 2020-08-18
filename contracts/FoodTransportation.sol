pragma solidity >=0.4.22 <0.7.0;

contract FoodTransportation{
    struct Location{
        string locationName;
        string transPerson;
        uint timeStamp;
    }
    string foodName;

    mapping (uint => Location) trail;
    uint8 locationNum;

    function addNewLocation(string memory food,string memory locationName,string memory transPerson)public{
        if(bytes(foodName).length == 0){
            foodName = food;
        }
        Location memory newLocation;
        newLocation.locationName = locationName;
        newLocation.transPerson = transPerson;
        newLocation.timeStamp = now;
        trail[locationNum] = newLocation;
        locationNum++;
    }

    function getLocationNum() public view returns(uint8){
        return locationNum;
    }

    function getFoodName() public view returns(string memory){
        return foodName;
    }

    function getLocation(uint8 locationNo) public view returns(string memory,string memory,uint){
        return (trail[locationNo].locationName,trail[locationNo].transPerson,trail[locationNo].timeStamp);
    }
}
