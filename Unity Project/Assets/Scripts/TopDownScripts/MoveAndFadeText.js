#pragma strict

public var speed: float;
public var fadeSpeed: float;
public var text: TextMesh;
public var player: GameObject;

function Start()
{
	player = GameObject.FindGameObjectWithTag("player");
	transform.position = player.transform.position;
}
function Update () 
{
	transform.position.z += speed * Time.deltaTime;
	text.color.a -= fadeSpeed * Time.deltaTime;
}
