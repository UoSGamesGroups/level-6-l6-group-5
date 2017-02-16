#pragma strict

public var speed: float;
public var levelIsPlaying: boolean;

function Start () {
	
}

function Update () {
	if(levelIsPlaying)
	{
		transform.position.x += speed * Time.deltaTime;
	}
	
}
