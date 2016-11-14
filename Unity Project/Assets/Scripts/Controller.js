#pragma strict

public var nextEventTimeMinMax: Vector2;
public var nextEventTime: float;
public var lastEventTime: Time;
public var choice: int;
public var boats: GameObject[];
public var boatSelected: GameObject;
public var time: float;
public var finished: boolean;
public var selectedBoat: boolean;

@Space(20)
@Header ("All should add to 100")
public var fires: int;
public var birds: int;
public var krakens: int;

function Start () 
{
	//Gets all boats and randoms start time
	boats = GameObject.FindGameObjectsWithTag("Boat");
	nextEventTime = Random.Range(nextEventTimeMinMax.x, nextEventTimeMinMax.y);
}

function Update () 
{
	//Set time to current scene time
	time = Time.time;
	
	CheckDistance();
	
	//If time is more than next event time random a number then call mechanic
	if(Time.time >= nextEventTime)
	{
		choice = Random.Range(1, 101);
		boatSelected = boats[Random.Range(0, boats.Length)];		
	
		if(choice <= fires)
		{
			Fire();
			Debug.Log("Fire");
		}
		else if(choice > fires && choice <= fires + birds)
		{
			Bird();
			Debug.Log("Bird");
		}
		else if(choice > fires + birds && choice <= fires + birds + krakens)
		{
			Kraken();
			Debug.Log("Kraken");
		}

		nextEventTime = Time.time + Random.Range(nextEventTimeMinMax.x, nextEventTimeMinMax.y);
		
	}
}

//If fire not already on boat then create fire
function Fire()
{
	if(!boatSelected.GetComponent(Boat).hasFire)
	{
		boatSelected.GetComponent(Boat).CreateFire();
	}
}

//Create a bird for the boat
function Bird()
{
	boatSelected.GetComponent(Boat).CreateBird();
}

//If kraken not already on boat then create kraken
function Kraken()
{
	if(!boatSelected.GetComponent(Boat).hasKraken)
	{
		boatSelected.GetComponent(Boat).CreateKraken();
	}
}

//Check distance on all boats. If more than end distance end level
function CheckDistance()
{
	for(var i = 0; i < boats.Length; i++)
	{
		if(boats[i].GetComponent(Boat).reachedEnd)
		{
			finished = true;	
		}
		else 
		{
			finished = false;
			break;
		}
	}
	
	if(finished)
	{
		Debug.Log("Level Completed");
	}
}