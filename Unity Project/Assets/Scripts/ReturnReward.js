#pragma strict

import System;

public var oldTime: System.DateTime;
public var startTime: System.DateTime;
public var timeDiff: System.TimeSpan;
public var totalDaysReturned: int;
public var window: GameObject;
public var wood: int;
public var cloth: int;
public var metal: int;
public var chest: int;
public var pictures: Image[];

function Start () 
{
	if(PlayerPrefs.GetString("Time") != "")
	{
		oldTime = System.DateTime.Parse(PlayerPrefs.GetString("Time"));
	}
	else
	{
		PlayerPrefs.SetString("Time", System.DateTime.Now.ToString());
	}

	startTime = System.DateTime.Now;
	timeDiff = startTime - oldTime;

	totalDaysReturned = PlayerPrefs.GetInt("TotalDaysReturned");

	Debug.Log(PlayerPrefs.GetString("Time"));
	Debug.Log(System.DateTime.Now.ToString());
	Debug.Log(timeDiff);
	
	Debug.Log(timeDiff.TotalDays);
	
	if(timeDiff.TotalDays > 1 && timeDiff.TotalDays < 2)
	{
		Debug.Log("123");
		totalDaysReturned++;
		PlayerPrefs.SetString("Time", System.DateTime.Now.ToString());
		UnlockItems(totalDaysReturned);
	}
	else if(timeDiff.TotalDays > 2)
	{
		Debug.Log("3333");
		PlayerPrefs.SetString("Time", System.DateTime.Now.ToString());
		totalDaysReturned = 0;
	}

	PlayerPrefs.SetInt("TotalDaysReturned", totalDaysReturned);

	for(var i: int = 1; i <= 7; i++)
	{
		if(i <= totalDaysReturned)
		{
			pictures[i - 1].color = Color.white;
		}
		else
		{
			pictures[i - 1].color = Color(0.1,0.1,0.1,1);
		}
	} 


	yield WaitForSeconds(2);

	window.SetActive(false);
}

function UnlockItems (days : int) 
{
	switch(days)
	{
		case 1:	wood = PlayerPrefs.GetInt("Wood");
				wood += 5;
				PlayerPrefs.SetInt("Wood", wood);
				break;
		case 2:	metal = PlayerPrefs.GetInt("Metal");
				metal += 5;
				PlayerPrefs.SetInt("Metal", metal);
				break;
		case 3:	cloth = PlayerPrefs.GetInt("Cloth");
				cloth += 5;
				PlayerPrefs.SetInt("Cloth", cloth);
				break;
		case 4:	wood = PlayerPrefs.GetInt("Wood");
				wood += 10;
				PlayerPrefs.SetInt("Wood", wood);
				break;
		case 5:	metal = PlayerPrefs.GetInt("Metal");
				metal += 5;
				PlayerPrefs.SetInt("Metal", metal);
				break;
		case 6:	cloth = PlayerPrefs.GetInt("Cloth");
				cloth += 5;
				PlayerPrefs.SetInt("Cloth", cloth);
				break;
				break;
		case 6:	chest = PlayerPrefs.GetInt("Zone1");
				chest ++;
				PlayerPrefs.SetInt("Zone1", chest);
				break;
	}
}

