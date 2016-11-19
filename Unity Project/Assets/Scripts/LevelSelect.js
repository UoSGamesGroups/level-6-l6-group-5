#pragma strict
import UnityEngine.UI;

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var touchDistanceY: float;
public var zoneUnlocked: int;
public var zone1Number: int;
public var zone2Number: int;
public var zone3Number: int;
public var zone4Number: int;
public var zone1Text: Text;
public var zone2Text: Text;
public var zone3Text: Text;
public var zone4Text: Text;
public var zone1Locked: boolean;
public var zone2Locked: boolean;
public var zone3Locked: boolean;
public var zone4Locked: boolean;

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
//sets if zone is locked or not
	if (zone1Number > zoneUnlocked)
	{
		zone1Locked = true;
	}
	else
	{
		zone1Locked = false;
	}
	if (zone2Number > zoneUnlocked)
	{
		zone2Locked = true;
	}
	else
	{
		zone2Locked = false;
	}
	if (zone3Number > zoneUnlocked)
	{
		zone3Locked = true;
	}
	else
	{
		zone3Locked = false;
	}
	if (zone4Number > zoneUnlocked)
	{
		zone4Locked = true;
	}
	else
	{
		zone4Locked = false;
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
