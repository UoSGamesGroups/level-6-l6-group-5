#pragma strict
import UnityEngine.UI;

public var timeLeft: float;
public var timeToCompleteIn: float;
public var timerDisplayText: Text;


function Start () 
{
	timeLeft = timeToCompleteIn;
}

function Update () 
{
	timeLeft -= 1 * Time.deltaTime;
	timerDisplayText.text = timeLeft.ToString("f0");

	
	if (timeLeft < 0)
	{
		//GameOver!!!!!!!!
	}
}
