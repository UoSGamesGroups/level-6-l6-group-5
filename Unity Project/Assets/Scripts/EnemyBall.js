#pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;
public var baseDamage: int;
public var explosion: GameObject;
public var wood: GameObject;
public var ballNum: int;

function Start () 
{
	var currentLevel:int = PlayerPrefs.GetInt("currentLevel");
	//damage = currentLevel * baseDamage; 

	switch(ballNum)
	{
		case 1: ballForce = GetComponentInParent(Boss).force;
				break;
		case 2: ballForce = GetComponentInParent(Boss).force2;
				break;
		case 3: ballForce = GetComponentInParent(Boss).force3;
				break;
	}

	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);

	transform.parent = null;

	Kill();
}

function Update () 
{
	if(transform.position.y <= 70)
	{
		Destroy(this.gameObject);
	}
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag == "BoatObj" && canDamage)
	{
		other.gameObject.GetComponentInParent(Boat).health -= damage;
		canDamage = false;
		Instantiate(explosion, transform.position, transform.rotation);
		//Instantiate(wood, transform.position, Quaternion.Euler(new Vector3(-51, -224, 40)));
		Destroy(this.gameObject);
	}
}

function Kill()
{
	yield WaitForSeconds(5);
	Destroy(this.gameObject);
}