#pragma strict

public var water: float;
public var boatSpeed: float;
public var distance: float = 1500;
public var distanceTrav: float;
public var sail: Cloth;
public var fires: int;
public var nextEventTimeMinMax: Vector2;
public var nextEventTime: float;
public var lastEventTime: Time;

function Start () 
{

}

function Update () 
{
	if(distanceTrav >= distance)
	{
		Debug.Log("Level Completed");
	}

	distanceTrav += boatSpeed * Time.deltaTime;

	boatSpeed = sail.externalAcceleration.x;

	Random.Range(nextEventTimeMinMax.x, nextEventTimeMinMax.y);

}

/*
public var total: int;
public var choice: int;


total = fires + holes + birds + kraken;

choice = Random.Range(0, total);

if(choice <= fires)
	fire();
else if( choice > fire && choice < birds)
	hole();
else if( choice > birds && < kraken)
	bird();


*/