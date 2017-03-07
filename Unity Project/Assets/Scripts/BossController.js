#pragma strict

public var currentBoss: int;
public var small: GameObject;
public var medium: GameObject;
public var big: GameObject;
public var bossLocation: Vector3;
public var boss: GameObject;
public var currentLevel: int;

function Awake () 
{
	currentBoss = PlayerPrefs.GetInt("CurrentBoss");
	currentLevel = PlayerPrefs.GetInt("currentLevel");

	Debug.Log(currentBoss);

	switch(currentBoss)
	{
		case 0:
				boss = Instantiate(big, bossLocation, transform.rotation);
				boss.GetComponent(Boss).nextShotTime.x = 3.5 - (currentLevel / 10);
				boss.GetComponent(Boss).nextShotTime.y = 4 - (currentLevel / 10);
				boss.GetComponent(Boss).baseDamage = 15;
				boss.GetComponent(Boss).healthStart = currentLevel * 100;
				boss.GetComponent(Boss).moveSpeed = 0;
				break;
		case 1:
				boss = Instantiate(medium, bossLocation, transform.rotation);
				boss.GetComponent(Boss).nextShotTime.x = 2 - (currentLevel / 10);
				boss.GetComponent(Boss).nextShotTime.y = 2.5 - (currentLevel / 10);
				boss.GetComponent(Boss).baseDamage = 7;
				boss.GetComponent(Boss).healthStart = currentLevel * 70;
				boss.GetComponent(Boss).moveSpeed =  0;
				break;
		case 2:
				boss = Instantiate(small, bossLocation, transform.rotation);
				boss.GetComponent(Boss).nextShotTime.x = 2.5 - (currentLevel / 10);
				boss.GetComponent(Boss).nextShotTime.y = 3 - (currentLevel / 10);
				boss.GetComponent(Boss).baseDamage = 10;
				boss.GetComponent(Boss).healthStart = currentLevel * 50;
				boss.GetComponent(Boss).moveSpeed = currentLevel * 0.5;
				break;
	}
}