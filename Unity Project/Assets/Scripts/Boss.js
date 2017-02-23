#pragma strict

public var health: float;
public var healthStart: float;
public var healthPercent: float;
public var bar: GameObject;
public var nextShot: float;
public var force: Vector3;
public var force2: Vector3;
public var force3: Vector3;
public var nextShotTime: Vector2;
public var boss: GameObject;
public var ball: GameObject;
public var ballPos: Vector3;
public var ballPos2: Vector3;
public var ballPos3: Vector3;
public var ballPosObj: GameObject;
public var ballPos2Obj: GameObject;
public var ballPos3Obj: GameObject;
public var loot: GameObject;
public var wood: int;
public var cloth: int;
public var metal: int;
public var playerWood: int;
public var playerCloth: int;
public var playerMetal: int;
public var woodText: Text;
public var clothText: Text;
public var metalText: Text;
public var dead: boolean;
public var cannon: GameObject;
public var healthImage: Image;
public var currentChests: int;
public var currentLevel: float; 
public var forceXMinMax: Vector2;
public var forceYMinMax: Vector2;
public var forceZMinMax: Vector2;
public var moveMinMax: Vector2;
public var moveSpeed: float;
public var right: boolean;

function Start () 
{
	currentLevel = PlayerPrefs.GetInt("currentLevel");

	healthStart = currentLevel * 70;
	health = healthStart;

	moveSpeed = currentLevel * 0.5;

	if(moveSpeed > 15)
	{
		moveSpeed = 15;
	}

	forceXMinMax.x += currentLevel;
	forceXMinMax.y -= currentLevel;
	
	forceYMinMax.x += currentLevel;
	forceYMinMax.y -= currentLevel;

	forceZMinMax.x += currentLevel;
	forceZMinMax.y -= currentLevel;

	nextShot = Random.Range(nextShotTime.x, nextShotTime.y);

	force.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
	force.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
	force.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

	force2.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
	force2.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
	force2.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

	force3.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
	force3.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
	force3.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

	cannon = GameObject.FindGameObjectWithTag("Cannon");

	nextShotTime.x = 2 - (currentLevel / 10);
	nextShotTime.y = 3 - (currentLevel / 10);

	if(nextShotTime.x < 0.5)
	{
		nextShotTime.x = 0.5;
	}

	if(nextShotTime.y < 0.5)
	{
		nextShotTime.y = 0.5;
	}
}

function Update () 
{

	ballPos = ballPosObj.transform.position;
	ballPos2 = ballPos2Obj.transform.position;
	ballPos3 = ballPos3Obj.transform.position;
	
	healthPercent = health/healthStart;
	healthImage.fillAmount = healthPercent;

	if(health <= 0 && !dead)
	{
		/*var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
		params.Add("Shooting", cannon.GetComponent(Cannon).shotCounter);
		var returnVal = Analytics.Analytics.CustomEvent("Amount", params);
		Debug.Log(returnVal);*/

		Analytic("Shooting", Cannon.shotsMissed, "Missed Shots " + currentLevel.ToString());
		Analytic("Shooting", Cannon.shotsHit, "Shots Hit " + currentLevel.ToString());
		Analytic("Shooting", cannon.GetComponent(Cannon).shotCounter, "Total Shots " + currentLevel.ToString());
		Analytic("Level " + currentLevel.ToString() + " Boss", true, "Won");
		
		dead = true;
		UnlockNextZone();
		LootAmounts();
	}
	
	if(nextShot <= Time.time)
	{
		Shoot();
		nextShot = Time.time + Random.Range(nextShotTime.x, nextShotTime.y);
	}

	if(transform.position.x < moveMinMax.x)
	{
		right = true;
	}
	else if(transform.position.x > moveMinMax.y)
	{
		right = false;
	}

	if(right)
	{
		transform.position.x += moveSpeed * Time.deltaTime;
	}
	else
	{
		transform.position.x -= moveSpeed  * Time.deltaTime;
	}
}

function Shoot()
{
	force.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
	force.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
	force.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

	var childBall = Instantiate(ball, ballPos, transform.rotation);
	childBall.GetComponent(EnemyBall).ballNum = 1;
	childBall.transform.parent = boss.transform;

	if(currentLevel >= 15)
	{
		force2.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
		force2.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
		force2.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

		childBall = Instantiate(ball, ballPos2, transform.rotation);
		childBall.GetComponent(EnemyBall).ballNum = 2;
		childBall.transform.parent = boss.transform;
	}

	if(currentLevel >= 25)
	{
		force3.x = Random.Range(forceXMinMax.x, forceXMinMax.y);
		force3.y = Random.Range(forceYMinMax.x, forceYMinMax.y);
		force3.z = Random.Range(forceZMinMax.x, forceZMinMax.y);

		childBall = Instantiate(ball, ballPos3, transform.rotation);
		childBall.GetComponent(EnemyBall).ballNum = 3;
		childBall.transform.parent = boss.transform;
	}
}

function LootAmounts()
{
	wood = Random.Range(2, 7);
	cloth = Random.Range(2, 7);	
	metal = Random.Range(2, 7);	

	loot.SetActive(true);
			
	woodText.text = "+" + wood;
	clothText.text = "+" + cloth;
	metalText.text = "+" + metal;

	playerWood = PlayerPrefs.GetInt("Wood");
	playerCloth = PlayerPrefs.GetInt("Cloth");
	playerMetal = PlayerPrefs.GetInt("Metal");

	PlayerPrefs.SetInt("Wood", wood + playerWood);
	PlayerPrefs.SetInt("Cloth", cloth + playerCloth);
	PlayerPrefs.SetInt("Metal", metal + playerMetal);

	currentChests = PlayerPrefs.GetInt("Zone"+ currentLevel);
	currentChests ++;
	PlayerPrefs.SetInt("Zone"+ currentLevel, currentChests);

	WaitAndLoad();
}

function UnlockNextZone()
{	
	var currentLevel:int = PlayerPrefs.GetInt("currentLevel");
	var zonesUnlocked:int = PlayerPrefs.GetInt("zoneUnlocked");
	if (currentLevel == zonesUnlocked)
	{
		currentLevel ++;
		PlayerPrefs.SetInt("zoneUnlocked", currentLevel);
		Debug.Log("New Zone Unlocked!");
	}
}

function WaitAndLoad ()
{
	yield WaitForSeconds(2);
	Application.LoadLevel ("LevelSelect");
}

function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}