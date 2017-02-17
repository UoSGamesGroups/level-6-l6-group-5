#pragma strict
private var swipeStartPos: Vector2;
private var swipeEndPos: Vector2;
private var swipeVector: Vector2;
public var speed: float;

function Update () {
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
}

function TurnShipUp()
{
	var yAngle = transform.localEulerAngles.y;
	if(yAngle > 45)
	transform.Rotate(0,-10,0);
}

function TurnShipDown()
{
	var yAngle = transform.localEulerAngles.y;
	if(yAngle < 130)
	transform.Rotate(0,10,0);
}