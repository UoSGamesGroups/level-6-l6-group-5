#pragma strict
import UnityEngine.UI;

public var touchStart: Vector2;
public var touchEnd: Vector2;
public var touchDistanceX: float;
public var touchDistanceY: float;
public var sailDecreaseRate: float;
public var sail: Cloth;
public var brokenSail: GameObject;
public var bottomBone: GameObject;
public var bottomBoneFixedPos: Vector3;
public var isBroken: boolean;

function Start () 
{
	bottomBoneFixedPos = bottomBone.transform.position;
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
				BreakSail();
				sail.externalAcceleration.x = 50;
			}
		}
		break;
	}

	if(Input.GetKeyDown(KeyCode.S))
	{
		sail.externalAcceleration.x += 5;
	}

// if sail force too strong, break sail
if(!isBroken)
	{
		if(sail.externalAcceleration.x > 50)
			{
				BreakSail();
			}
	}

}


function BreakSail()
{
	isBroken = true;
	brokenSail.SetActive (true);
	sail.gameObject.SetActive (false);
	brokenSail.GetComponent.<Cloth>().externalAcceleration.x = sail.externalAcceleration.x; 
	
}