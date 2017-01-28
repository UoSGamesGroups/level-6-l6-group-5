#pragma strict
import UnityEngine.UI;

public var objectives: String[];
public var objective: String;
public var zoneStartPanel: GameObject;
public var objectiveTypeText: Text;
public var objectiveTypeDescriptionText: Text;
public var canvas: GameObject;
public var TimerDisplayObj: GameObject;

function Start () 
{
	//Get Random Objective, Probably Change this in future to set objectives for certain zones.
	objective = objectives[Random.Range(0,objectives.Length)];
	
	switch(objective)
	{
		case "Find Boss": 
		objectiveTypeText.text = "Find The Boss";
		objectiveTypeDescriptionText.text = "Explore the zone and search for the enemy boss ship, watch out for deadly mines along the way!";
		break;
		
		case "Time Race":
		objectiveTypeText.text = "The Enemy is Running!";
		objectiveTypeDescriptionText.text = "Explore the zone and search for the enemy boss ship, before it gets away.";
		var timerObj = Instantiate (TimerDisplayObj, transform.position, transform.rotation);
		timerObj.transform.parent = canvas.transform;
		break;
		
		case "Rescue Drifters": 
		objectiveTypeText.text = "Rescue The People";
		objectiveTypeDescriptionText.text = "Explore the zone and search for the people left floating in the sea by the enemies doing, save them all before killing the boss.";
		break;
	}
	zoneStartPanel.SetActive(true);
}
