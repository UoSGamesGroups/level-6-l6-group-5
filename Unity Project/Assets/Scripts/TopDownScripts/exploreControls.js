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

function Update () {
//show health
healthUI.fillAmount = health/100;

if(health <= 0)
{
Application.LoadLevel("runner");
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
	if (swipeVector.y > 100){
	Debug.Log("Swipe Down");
	TurnShipDown();
	} else if(swipeVector.y < -100){
	Debug.Log("Swipe Up");
	TurnShipUp();
	}
	}
	if(yAngle < 90)
	{
	transform.Rotate(0,Time.deltaTime * turnSpeed,0);
	} else if(yAngle > 90){
	transform.Rotate(0,-Time.deltaTime * turnSpeed,0);
	}
}

function TurnShipUp()
{
	if(yAngle > 45)
	transform.Rotate(0,-10,0);
}

function TurnShipDown()
{
	if(yAngle < 130)
	transform.Rotate(0,10,0);
}