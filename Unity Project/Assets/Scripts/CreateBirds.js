#pragma strict

public var bird: GameObject;
public var pos: Vector3;

function Create() 
{
	Instantiate(bird, pos, transform.rotation);
}