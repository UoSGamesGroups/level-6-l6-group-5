#pragma strict

public var health: float;
public var healthStart: float;
public var healthPercent: float;
public var bar: GameObject;
public var nextShot: float;
public var force: Vector3;
public var nextShotTime: Vector2;
public var boss: GameObject;
public var ball: GameObject;
public var ballPos: Vector3;
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


function Start () 
{
var currentLevel:int = PlayerPrefs.GetInt("currentLevel");

	healthStart = currentLevel * 100;
	health = healthStart;
	nextShot = Random.Range(nextShotTime.x, nextShotTime.y);
	force.x = Random.Range(-100, 100);
	force.y = Random.Range(600, 1000);
	force.z = Random.Range(-800, -500);	

	cannon = GameObject.FindGameObjectWithTag("Cannon");
}

function Update () 
{

	healthPercent = health/healthStart;
	//bar.transform.localScale.x = healthPercent;
	healthImage.fillAmount = healthPercent;

	if(health <= 0 && !dead)
	{
		var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
		params.Add("Shooting", cannon.GetComponent(Cannon).shotCounter);
		var returnVal = Analytics.Analytics.CustomEvent("Amount", params);
		Debug.Log(returnVal);

		dead = true;
		UnlockNextZone();
		LootAmounts();
	}
	
	if(nextShot <= Time.time)
	{
		Shoot();
		nextShot = Time.time + Random.Range(nextShotTime.x, nextShotTime.y);
	}
}

function Shoot()
{
	force.x = Random.Range(0, -150);
	force.y = Random.Range(600, 1000);
	force.z = Random.Range(-800, -500);	

	var childBall = Instantiate(ball, ballPos, transform.rotation);
	childBall.transform.parent = boss.transform;
}

function LootAmounts()
{
	wood = Random.Range(0, 6);
	cloth = Random.Range(0, 6);	
	metal = Random.Range(0, 6);	

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

	yield WaitForSeconds(2);
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
	
	Application.LoadLevel ("LevelSelect");
}
