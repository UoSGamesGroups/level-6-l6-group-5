﻿#pragma strict

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
public var boatXPos: Vector2;
public var health: float;
public var healthStart: float;
public var healthImage: Image;
public var dead: GameObject;
public var reachedEnd: boolean;
public var currentLevel: int;
public var cameraAnim: Animator;
static var isDead: boolean;

function Start()
{
	controller = GameObject.FindGameObjectWithTag("Controller");
	firePos = new Vector3(transform.position.x + 14, transform.position.y, transform.position.z - 7);
	birdPos = new Vector3(transform.position.x + 45, transform.position.y + 13, transform.position.z - 6);
	krakenPos = new Vector3(transform.position.x + 15, transform.position.y - 21, transform.position.z + 3);

	currentLevel = PlayerPrefs.GetInt("currentLevel");
	
	if (PlayerPrefs.GetInt("Health") < 1)
	{
		PlayerPrefs.SetInt("Health", 1);
	}
	// old way	health = 100 * PlayerPrefs.GetInt("Health");
	health = (PlayerPrefs.GetFloat("healthAtEndOfExplore"));
	healthStart = 100 * PlayerPrefs.GetInt("Health");

	Analytic("Level " + currentLevel.ToString() + " Boss", true, "Loaded");
	isDead = false;
}

function Update () 
{
	//If end of level reached set to true
	if(distanceTrav >= distance)
	{
		reachedEnd = true;
	}

	healthImage.fillAmount = health/healthStart;

	//Calculate distance travelled
	distanceTrav += boatSpeed * Time.deltaTime;
	
	//Set speed to sail acceleration
	boatSpeed = sail.externalAcceleration.x;

	if(health <= 0)
	{
		Analytic("Shooting", Cannon.shotsMissed, "Missed Shots " + currentLevel.ToString());
		Analytic("Shooting", Cannon.shotsHit, "Shots Hit " + currentLevel.ToString());
		Analytic("Shooting", Cannon.shotCounter, "Total Shots " + currentLevel.ToString());
		Analytic("Level " + currentLevel.ToString() + " Boss", true, "Lost");
		
		dead.SetActive(true);
		isDead = true;
	}

	if(Input.GetKeyDown(KeyCode.T))
	{
		CreateBird();
	}
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
	//birdPos.y = Random.Range(148, 170);
	birdPos.y = 150;
	
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
	krakenPos.x = Random.Range(boatXPos.x, boatXPos.y);
	var childKraken = Instantiate(kraken, krakenPos, transform.rotation);
	childKraken.transform.parent = gameObject.transform;
	hasKraken = true; 
}

function CameraShake()
{
	cameraAnim.SetTrigger("Shake");
}

function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}