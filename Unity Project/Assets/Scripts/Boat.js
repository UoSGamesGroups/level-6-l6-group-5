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

public var reachedEnd: boolean;

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

	mainCamera = GameObject.FindGameObjectWithTag("MainCamera");
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
	Instantiate(bird, birdPos, transform.rotation);
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
	Debug.Log("Boat Clicked");
	mainCamera.SetActive(false);
	boatCamera.SetActive(true);
	backButton.SetActive(true);	
}