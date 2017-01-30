#pragma strict
import UnityEngine.UI;

public var objectives: String[];
public var objective: String;
public var zoneStartPanel: GameObject;
public var objectiveTypeText: Text;
public var objectiveTypeDescriptionText: Text;
public var canvas: GameObject;
public var timerDisplayObj: GameObject;
public var rescueDriftersObj: GameObject;
public var stormMaker: GameObject;
public var zoneNumber: int;

function Start () 
{
	zoneStartPanel.SetActive(true);
	zoneNumber = PlayerPrefs.GetInt("currentLevel");
	//objective = objectives[Random.Range(0,objectives.Length)];
	//Set what objective you want for the zone by inputing the method into the right case.
	switch(zoneNumber)
	{
		case 1: 
		Debug.Log("case1");
		FindBoss();
		break;
		
		case 2:
		TimeRace();
		break;
		
		case 3:
		RescueDrifters();
		break;
		
		case 4:
		StormZone();
		break;
	}
	
}
// start button
function SetSail()
{
	zoneStartPanel.SetActive(false);
}

//Objectives
function FindBoss()
{
			Debug.Log("find boss");

	objectiveTypeText.text = "Find The Boss";
	objectiveTypeDescriptionText.text = "Explore the zone and search for the enemy boss ship, watch out for deadly mines along the way!";
}
function TimeRace()
{
	objectiveTypeText.text = "The Enemy is Running!";
	objectiveTypeDescriptionText.text = "Explore the zone and search for the enemy boss ship, before it gets away.";
	//var timerObj = Instantiate (timerDisplayObj, transform.position, transform.rotation);
	//timerObj.transform.parent = canvas.transform;
	timerDisplayObj.SetActive(true);
}
function RescueDrifters()
{
	objectiveTypeText.text = "Rescue The People";
	objectiveTypeDescriptionText.text = "Explore the zone and search for the people left floating in the sea by the enemies doing, save them all before killing the boss.";
	rescueDriftersObj.SetActive(true);
}
function StormZone()
{
	objectiveTypeText.text = "Weather The Storm!";
	objectiveTypeDescriptionText.text = "Be careful of the strong winds from the storm, find and defeat the enemy ship.";
	stormMaker.SetActive(true);
}