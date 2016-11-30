#pragma strict

public var health: float;
public var healthStart: float;
public var healthPercent: float;
public var bar: GameObject;
public var nextShot: float;
public var force: Vector3;
public var nextShotTime: float;
public var boss: GameObject;
public var ball: GameObject;
public var ballPos: Vector3;

function Start () 
{
	health = healthStart;
	nextShot = nextShotTime;
}

function Update () 
{

	healthPercent = health/healthStart * 10.93461;
	bar.transform.localScale.x = healthPercent;
	
	if(health <= 0)
	{
		Destroy(this.gameObject);
		WaitAndLoad();
	}
	
	if(nextShot <= Time.time)
	{
		Shoot();
		nextShot = Time.time + nextShotTime;
		
	}
}

function Shoot()
{
	var childBall = Instantiate(ball, ballPos, transform.rotation);
	childBall.transform.parent = boss.transform;
}

function WaitAndLoad ()
{
//yield WaitForSeconds (3);
Application.LoadLevel ("LevelSelect");
}
