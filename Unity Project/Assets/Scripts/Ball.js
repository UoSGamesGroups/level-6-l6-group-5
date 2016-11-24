#pragma strict

public var ballForce: Vector3;


function Start () 
{
	ballForce = GetComponentInParent(Cannon).force;
	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);
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
	if(other.gameObject.tag == "Enemy")
	{
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}

}