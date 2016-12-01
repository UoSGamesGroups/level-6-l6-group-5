#pragma strict

public var timer: float;
public var hint1: GameObject;
public var hint2: GameObject;
function Start () {

}

function Update ()
{
	timer += 1 * Time.deltaTime;

	if (timer > 20)
	{
		hint1.SetActive (true);
	}



}

function Hint2 ()
{
	hint2.SetActive (false);
}