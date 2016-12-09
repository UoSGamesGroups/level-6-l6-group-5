 #pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;


function Start () 
{
	ballForce = GetComponentInParent(Cannon).force;
	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);

	if (PlayerPrefs.GetInt("CannonBall") < 1)
	{
		PlayerPrefs.SetInt("CannonBall", 1);
	}


	damage = 10 * PlayerPrefs.GetInt("CannonBall");
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
	if(other.gameObject.tag == "Enemy" && canDamage)
	{
		other.gameObject.GetComponentInParent(Boss).health -= damage;
		canDamage = false;
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}

}