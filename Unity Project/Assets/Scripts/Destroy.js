#pragma strict

public var wait: float;

function Start () 
{
	yield WaitForSeconds(wait);
	Destroy(this.gameObject);
}
