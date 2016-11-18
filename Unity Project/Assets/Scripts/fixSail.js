#pragma strict

public var mousePos: Vector3;
public var bonePos: GameObject;
public var sail: GameObject;
public var distance: float;
public var pos: Vector3;
public var boatCam: Camera;

function OnMouseDrag()
{
	mousePos.x = (Input.mousePosition.x);
	mousePos.y = (Input.mousePosition.y);
	mousePos.z = (distance);
	pos = boatCam.ScreenToWorldPoint (mousePos);
	bonePos.transform.position = pos;
	sail.SetActive (true);
}
