#pragma strict
public var bobbingUp: boolean;
public var bobTime: float;
public var bobSpeed: float;
public var timeToBob: float;

function Update () {

	if (bobbingUp)
	{
	//	transform.position.y += bobSpeed;
		transform.Rotate(0,0, Time.deltaTime);
	} else {
	//	transform.position.y -= bobSpeed;
		transform.Rotate(0,0, -Time.deltaTime);
		
	}

	if (bobTime > timeToBob)
	{
		bobbingUp = !bobbingUp;
		bobTime = 0;
	}

	bobTime += 1 * Time.deltaTime;


	
}
