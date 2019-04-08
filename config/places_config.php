<?php
  require_once('places_config.php'); //include database config file
  $places = $db->query("SELECT * FROM tbl_places");
?>

[PHP_MYSQLI]
extension=php_mysqli.dll



<datalist id="saved_places">
  {/* loop through the places saved in the database and store their data into each of the data attribute in the options */}
  <?php while($row = $places->fetch_object()){ ?>
  <option value="<?php echo $row->place; ?>" data-id="<?php echo $row->place_id; ?>"
          data-lat="<?php echo $row->lat; ?>" data-lng="<?php echo $row->lng; ?>"
          data-place="<?php echo $row->place; ?>" data-description="<?php echo $row->description; ?>"><?php echo $row->place; ?>
  </option>
  <?php } ?>
</datalist>


<?php
//host, user, password, database name
$db = new Mysqli("localhost", "root", "", "db");
if ($db->connect_errno){
  die('Connect Error: ' . $db->connect_errno);
}
?>

<?php  
require_once('places_config.php'); //include database config file   

//get place information submitted via ajax earlier   
$place = $_POST['place'];    
$description = $_POST['description'];    
$latitude = $_POST['lat'];   
$longitude = $_POST['lng'];  

$db->query("
 INSERT INTO tbl_places SET place='$place', description='$description',
 lat='$latitude', lng='$longitude'
 ");
  
$place_id = $db->insert_id; //get the id of the newly inserted record
echo $place_id;
?>