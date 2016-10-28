#pragma strict

public var fire: GameObject;
public var pos: Vector3;

function Create() 
{
	Instantiate(fire, pos, transform.rotation);
}