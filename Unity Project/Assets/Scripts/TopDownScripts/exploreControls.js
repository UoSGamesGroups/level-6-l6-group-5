#pragma strict
import UnityEngine.UI;

private var swipeStartPos: Vector2;
private var swipeEndPos: Vector2;
private var swipeVector: Vector2;
public var speed: float;
public var yAngle: float;
public var turnSpeed: float;
public var health: float;
public var healthUI: Image;
public var currentLevel: int;
public var endDistance: float;
public var curentDistance: float;
public var maxZ: float;
public var minZ: float;

function Start()
{
	currentLevel = PlayerPrefs.GetInt("currentLevel");

	Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Loaded");
}

function Update () 
{
	//show health
	healthUI.fillAmount = health/100;

	if(health <= 0)
	{
		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Died");
		Application.LoadLevel("runner");
	}

	curentDistance = speed * Time.time;

	if(curentDistance >= endDistance)
	{
		Analytic("Level " + currentLevel.ToString() + " Exploration", true, "Won");
		Application.LoadLevel("Boss");
	}

	yAngle = transform.localEulerAngles.y;
	//moveBoat forwards
	transform.position += (transform.forward * speed) * Time.deltaTime;
	//if mouse down or touch set start pos
	if(Input.GetKeyDown (KeyCode.Mouse0))
	{
		swipeStartPos.x = Input.mousePosition.x;
		swipeStartPos.y = Input.mousePosition.y;
	}
	//if mouse down or touch set end pos
	if(Input.GetKeyUp (KeyCode.Mouse0))
	{
		swipeEndPos.x = Input.mousePosition.x;
		swipeEndPos.y = Input.mousePosition.y;
		//Get direction of swipe
		swipeVector = swipeStartPos - swipeEndPos;

		if (swipeVector.y > 100)
		{
			Debug.Log("Swipe Down");
			TurnShipDown();
		} 
		else if(swipeVector.y < -100)
		{
			Debug.Log("Swipe Up");
			TurnShipUp();
		}
	}

	if(yAngle < 90)
	{
		transform.Rotate(0,Time.deltaTime * turnSpeed,0);
	} 
	else if(yAngle > 90)
	{
		transform.Rotate(0,-Time.deltaTime * turnSpeed,0);
	}


	if(transform.position.z < minZ)
		transform.position.z = minZ;

	if(transform.position.z > maxZ)
		transform.position.z = maxZ;
	


}

function TurnShipUp()
{
	if(transform.position.z < maxZ)
	{
		if(yAngle > 45)
		transform.Rotate(0,-10,0);
	}
}



function TurnShipDown()
{
	if(transform.position.z > minZ)
	{
		if(yAngle < 130)
		transform.Rotate(0,10,0);
	}
}

function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}