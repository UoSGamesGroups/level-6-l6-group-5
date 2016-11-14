#pragma strict
import UnityEngine.UI;

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var touchDistanceY: float;
public var sail: Cloth;

function Start () 
{
//sail = GameObject.FindGameObjectWithTag("sail");
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
		Debug.Log("Swipe right");
			sail.externalAcceleration.x += 5;
			if(sail.externalAcceleration.x > 50)
			{
				sail.externalAcceleration.x = 50;
			}
		}
		break;
	}

if(Input.GetKeyDown(KeyCode.S))
{
	sail.externalAcceleration.x += 5;
}
}