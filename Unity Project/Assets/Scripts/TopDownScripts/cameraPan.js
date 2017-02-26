#pragma strict

public var speed: float;
public var cameraOffset: float;
public var levelIsPlaying: boolean;
public var boat: GameObject;

function Start () {
	
}

function Update () {
	if(levelIsPlaying)
	{
		// camera pan transform.position.x += speed * Time.deltaTime;
		transform.position.x = boat.transform.position.x + cameraOffset;
	}
	
}
