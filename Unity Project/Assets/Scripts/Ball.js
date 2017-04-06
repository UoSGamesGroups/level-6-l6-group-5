 #pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;
public var explosion: GameObject;
public var line: LineRenderer;
public var nextLine: float;
public var amount: float;
public var parentType: String;
public var explosion2: GameObject;
public var wood: GameObject;
public var lineMaterial: Material;

function Start () 
{
	ballForce = GetComponentInParent(Cannon).force;
	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);

	if (PlayerPrefs.GetInt("CannonBall") < 1)
	{
		PlayerPrefs.SetInt("CannonBall", 1);
	}

	damage = 10 * PlayerPrefs.GetInt("CannonBall");

	parentType = GetComponentInParent(Cannon).type.ToString();

	if(parentType == "Heavy")
	{
		damage = damage * 2;
	}

	line.SetPosition(0, transform.position);
	nextLine = Time.time + 0.05;

	line.material.color = Color(1,0,0,1);
}

function Update () 
{
	if(transform.position.y <= 70)
	{
		Cannon.shotsMissed ++;
		Destroy(this.gameObject);
	}

	if(nextLine < Time.time && canDamage)
	{
		line.numPositions = line.numPositions + 1;
		line.SetPosition(line.numPositions - 1, transform.position);
		nextLine = Time.time + 0.05;
	}
	amount -= 0.4 * Time.deltaTime;

	line.material.color = Color(1,0,0,amount);
	
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag == "Enemy" && canDamage)
	{
		other.gameObject.GetComponentInParent(Boss).health -= damage;
		other.gameObject.GetComponentInParent(Boss).UIShake();
		canDamage = false;
		//Instantiate(explosion, transform.position, transform.rotation);
		Instantiate(explosion2, transform.position, transform.rotation);
		//Instantiate(wood, transform.position, Quaternion.Euler(new Vector3(-51, -224, 40)));
		Cannon.shotsHit ++;

		if(parentType == "Slow")
		{
			other.gameObject.GetComponentInParent(Boss).moveSpeed = other.gameObject.GetComponentInParent(Boss).moveSpeed * 0.5;
		}

		if(parentType == "Fire")
		{
			other.gameObject.GetComponentInParent(Boss).burnAmount = 0;
			other.gameObject.GetComponentInParent(Boss).Burn(damage);
		}

		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}

}