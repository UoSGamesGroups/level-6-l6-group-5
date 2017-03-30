#pragma strict

public var player: GameObject;

function Update () 
{
	transform.position.z = player.transform.position.z;
}
