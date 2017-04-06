#pragma strict

public var button: GameObject;
public var cam: GameObject;
static var clicked: boolean;
public var swipeStartPos: Vector2;
public var swipeEndPos: Vector2;
public var swipeVector: Vector2;

function Start () 
{
	button.SetActive(false);
}

function Update () 
{
	if(Time.time > 1.6 && !clicked)
	{
		button.SetActive(true);
	}
	else if(Time.time > 1.5 && clicked)
	{
		button.SetActive(false);
	}

	if(Input.GetKeyDown (KeyCode.Mouse0))
	{
		swipeStartPos.x = Input.mousePosition.x;
		swipeStartPos.y = Input.mousePosition.y;
	}

	if(Input.GetKeyUp (KeyCode.Mouse0))
	{
		swipeEndPos.x = Input.mousePosition.x;
		swipeEndPos.y = Input.mousePosition.y;
		//Get direction of swipe
		swipeVector = swipeStartPos - swipeEndPos;

		if (swipeVector.y < -50)
		{
			clicked = true;
			//cam.transform.parent = null;
		} 
	}
}
