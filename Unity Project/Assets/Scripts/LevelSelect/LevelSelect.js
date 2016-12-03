﻿#pragma strict
import UnityEngine.UI;

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var touchDistanceY: float;
public var zoneUnlocked: int; //number of zones player has unlocked
//holds number of zone
public var zone1Number: int; 
public var zone2Number: int;
public var zone3Number: int;
public var zone4Number: int;
//holds the text for each zone
public var zone1Text: Text;
public var zone2Text: Text;
public var zone3Text: Text;
public var zone4Text: Text;
//holds wether the zone is locked
public var zone1Locked: boolean;
public var zone2Locked: boolean;
public var zone3Locked: boolean;
public var zone4Locked: boolean;
//holds the locked image for each zone
public var zone1LockedImage: GameObject;
public var zone2LockedImage: GameObject;
public var zone3LockedImage: GameObject;
public var zone4LockedImage: GameObject;
//hint for locked zone
public var hint2: GameObject;

function Start () 
{
	UpdateText();
}

function Update () 
{

//if there  is a touch
	if (Input.touchCount > 0)
	var touch: Touch = Input.GetTouch(0);
//do this on phase of touch
	switch(touch.phase)
	{
//set touchStart pos on touch began
	case TouchPhase.Began: touchStart = touch.position;
	break;
// set touchEnd pos on touchEnded then calculate direction
	case TouchPhase.Ended: touchEnd = touch.position;
		touchDistanceX = touchStart.x - touchEnd.x;
		if (touchDistanceX < - 100)
		{
		SwipeRight();
		Debug.Log("Swipe right");
		}
		else if (touchDistanceX > 100)
		{
		SwipeLeft();
		Debug.Log("Swipe left");		
		}
	}

//USE ARROW KEYS INSTEAD OF SWIPING FOR TESTING
	if(Input.GetKeyDown(KeyCode.LeftArrow))
	{
		SwipeRight();
	}
	if(Input.GetKeyDown(KeyCode.RightArrow))
	{
		SwipeLeft();
	}


}

function UpdateText()
{
//Sets the zone numbers text in game
	zone1Text.text = "Zone: " + zone1Number;
	zone2Text.text = "Zone: " + zone2Number;
	zone3Text.text = "Zone: " + zone3Number;
	zone4Text.text = "Zone: " + zone4Number;
//sets if zone is locked or not and displays locked image
	if (zone1Number > zoneUnlocked)
	{
		zone1Locked = true;
		zone1LockedImage.SetActive (zone1Locked);
	}
	else
	{
		zone1Locked = false;
		zone1LockedImage.SetActive (zone1Locked);
	}
	if (zone2Number > zoneUnlocked)
	{
		zone2Locked = true;
		zone2LockedImage.SetActive (zone2Locked);
	}
	else
	{
		zone2Locked = false;
		zone2LockedImage.SetActive (zone2Locked);
	}
	if (zone3Number > zoneUnlocked)
	{
		zone3Locked = true;
		zone3LockedImage.SetActive (zone3Locked);
	}
	else
	{
		zone3Locked = false;
		zone3LockedImage.SetActive (zone3Locked);
	}
	if (zone4Number > zoneUnlocked)
	{
		zone4Locked = true;
		zone4LockedImage.SetActive (zone4Locked);
	}
	else
	{
		zone4Locked = false;
		zone4LockedImage.SetActive (zone4Locked);
	}
}
function SwipeLeft()
{
	zone1Number += 4;
	zone2Number += 4;
	zone3Number += 4;
	zone4Number += 4;
	UpdateText();
}
function SwipeRight()
{
	zone1Number -= 4;
	zone2Number -= 4;
	zone3Number -= 4;
	zone4Number -= 4;
	UpdateText();
}

function Explore(number:int)
{
	PlayerPrefs.SetInt("Level", number);

	switch (number)
	{
	case 1: if (!zone1Locked)
			{
				Application.LoadLevel ("Scene 1");
			}
			else
			{
				hint2.SetActive (true);
			}
	break;
	case 2:	if (!zone2Locked)
			{
				Application.LoadLevel ("Scene 1");
			}
			else
			{
				hint2.SetActive (true);
			}
	break;
	case 3:	if (!zone3Locked)
			{
				Application.LoadLevel ("Scene 1");
			}
			else
			{
				hint2.SetActive (true);
			}
	break;
	case 4:	if (!zone4Locked)
			{
				Application.LoadLevel ("Scene 1");
			}
			else
			{
				hint2.SetActive (true);
			}
	break;
	}

}
