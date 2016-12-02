#pragma strict
public var boat: Rigidbody;
public var force: Vector3;

function Start () {

}

function Update () 
{
if (Input.GetKeyDown(KeyCode.W))
	{
		boat.AddForce(force);
	}

}
