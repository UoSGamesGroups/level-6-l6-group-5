#pragma strict

public var water: float;
public var boatSpeed: float;
public var distance: float = 1500;
public var distanceTrav: float;
public var sail: Cloth;
public var hasFire: boolean;
public var hasKraken: boolean;
public var fire: GameObject;
public var bird: GameObject;
public var kraken: GameObject;
public var firePos: Vector3;
public var birdPos: Vector3;
public var krakenPos: Vector3;
public var mainCamera: GameObject;
public var boatCamera: GameObject;
public var backButton: GameObject;
public var controller: GameObject;
public var leftOrRight: int;


public var reachedEnd: boolean;

function Start()
{
	controller = GameObject.FindGameObjectWithTag("Controller");
	firePos = new Vector3(transform.position.x + 14, transform.position.y, transform.position.z - 7);
	birdPos = new Vector3(transform.position.x + 45, transform.position.y + 13, transform.position.z - 6);
	krakenPos = new Vector3(transform.position.x + 15, transform.position.y - 21, transform.position.z + 3);
	
}

function Update () 
{
	//If end of level reached set to true
	if(distanceTrav >= distance)
	{
		reachedEnd = true;
	}

	//Calculate distance travelled
	distanceTrav += boatSpeed * Time.deltaTime;
	
	//Set speed to sail acceleration
	boatSpeed = sail.externalAcceleration.x;

}

//Create a fire and set it to child object of boat
function CreateFire () 
{
	var childFire = Instantiate(fire, firePos, transform.rotation);
	childFire.transform.parent = gameObject.transform;
	hasFire = true; 
}

//Create a bird
function CreateBird () 
{
	birdPos.y = Random.Range(148, 170);
	
	leftOrRight = Random.Range(0,2);
	
	if(leftOrRight == 0) 
	{
		birdPos.x = 9;
	}
	else 
	{
		birdPos.x = 70;
	}
	
	Instantiate(bird, birdPos, Quaternion.Euler(90,0,0));
}

//Create a kraken and set it to child object of boat
function CreateKraken () 
{
	var childKraken = Instantiate(kraken, krakenPos, transform.rotation);
	childKraken.transform.parent = gameObject.transform;
	hasKraken = true; 
}

function OnMouseDown()
{
	if(!controller.GetComponent(Controller).selectedBoat)
	{
		Debug.Log("Boat Clicked");
		mainCamera.SetActive(false);
		boatCamera.SetActive(true);
		backButton.SetActive(true);
		controller.GetComponent(Controller).selectedBoat = true;
		GetComponent(BoxCollider).enabled = false;
		
	}
}