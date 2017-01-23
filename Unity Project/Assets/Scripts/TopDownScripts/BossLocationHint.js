#pragma strict

public var bossLocationHintObj: GameObject;
public var hint: GameObject;
private var showHintTimer: float;
public var showHintAfterSeconds: float;

function Update () 
{
	showHintTimer += 1 * Time.deltaTime;
	if (showHintTimer >  showHintAfterSeconds)
	{
		hint = Instantiate(bossLocationHintObj, transform.position, transform.rotation);
		showHintTimer = 0;
		FlashHint();
	}
}

function FlashHint()
{
	for(var i : int = 0; i < 5; i++)
	{
	Debug.Log ("flashing");
	hint.GetComponent.<MeshRenderer>().enabled = !hint.GetComponent.<MeshRenderer>().enabled;
	yield WaitForSeconds (0.3);

	}
}
