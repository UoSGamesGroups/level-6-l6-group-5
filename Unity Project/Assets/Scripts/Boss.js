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
public var woodText: Text;
public var clothText: Text;
public var metalText: Text;
public var dead: boolean;


function Start () 
{
	healthStart = PlayerPrefs.GetInt("Level") * 100;
	health = healthStart;
	nextShot = Random.Range(nextShotTime.x, nextShotTime.y);
	force.x = Random.Range(-100, 100);
	force.y = Random.Range(600, 1000);
	force.z = Random.Range(-800, -500);	
}

function Update () 
{

	healthPercent = health/healthStart * 10.93461;
	bar.transform.localScale.x = healthPercent;
	
	if(health <= 0 && !dead)
	{
		dead = true;
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

	PlayerPrefs.SetInt("Wood", PlayerPrefs.GetInt("Wood" + wood));
	PlayerPrefs.SetInt("Cloth", PlayerPrefs.GetInt("Cloth" + cloth));
	PlayerPrefs.SetInt("Metal", PlayerPrefs.GetInt("Metal" + metal));
	
	yield WaitForSeconds(2);
	WaitAndLoad();
}

function WaitAndLoad ()
{
	
	Application.LoadLevel ("LevelSelect");
}
