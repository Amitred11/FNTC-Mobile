import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback, // Added for the drawer backdrop
} from 'react-native';
// Corrected: All required icon sets are imported
import { Ionicons, FontAwesome, Entypo, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';

// --- SKELETON LOADER COMPONENT ---
const HomePageSkeleton = () => {
  return (
    <Animatable.View animation="flash" duration={3000} iterationCount="infinite" style={{ opacity: 0.8 }}>
      {/* Banner Skeleton */}
      <View style={styles.skeletonBanner} />
      {/* Account Overview Skeleton */}
      <View style={styles.skeletonAccountOverview}>
        <View style={[styles.skeletonLine, { width: 220, height: 20, marginBottom: 15 }]} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.skeletonAccountBox} />
          <View style={styles.skeletonAccountBox} />
          <View style={styles.skeletonAccountBox} />
        </View>
      </View>
      {/* Available Plans Skeleton */}
      <View style={styles.plansSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
          <View style={[styles.skeletonLine, { width: 180, height: 20 }]} />
          <View style={[styles.skeletonLine, { width: 60, height: 14 }]} />
        </View>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.skeletonPlanItem}>
            <View style={styles.skeletonPlanIcon} />
            <View style={{ flex: 1, marginRight: 15 }}>
              <View style={[styles.skeletonLine, { width: '80%', height: 13, marginBottom: 8 }]} />
              <View style={[styles.skeletonLine, { width: '60%', height: 10 }]} />
            </View>
            <View style={[styles.skeletonLine, { width: 80, height: 13 }]} />
          </View>
        ))}
      </View>
      {/* Bottom Buttons & Feedback Skeletons */}
      <View style={styles.skeletonBottomButtons}><View style={styles.skeletonBigButton} /><View style={styles.skeletonBigButton} /></View>
      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: -70 }}>
        <View style={[styles.skeletonLine, { width: 200, height: 18, marginBottom: 15 }]} /><View style={{ flexDirection: 'row' }}><View style={styles.skeletonCard} /><View style={styles.skeletonCard} /></View>
      </View>
    </Animatable.View>
  );
};

// --- DRAWER ITEM COMPONENT ---
function DrawerItem({ icon, label, onPress }) {
  const IconMap = {
    home: <Ionicons name="home-outline" size={22} color="#333" />,
    'id-card': <FontAwesome5 name="id-card" size={20} color="#333" />,
    'credit-card': <MaterialIcons name="payment" size={22} color="#333" />,
    'help-circle-outline': <Ionicons name="help-circle-outline" size={24} color="#333" />,
    settings: <Ionicons name="settings-outline" size={22} color="#333" />,
  };
  return (
    <TouchableOpacity style={styles.amenuItem} onPress={onPress}>
      {IconMap[icon]}
      <Text style={styles.amenuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const accountBoxes = [
    { title: 'Total Bills', value: '₱1,589' }, { title: 'Current Plan', value: 'Gold' }, { title: 'Usage Consumption', value: '83 mbps' },
  ];
  const accountDetailsWidth = accountBoxes.length * (155 + 20);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser({ displayName: currentUser.displayName, photoURL: currentUser.photoURL, email: currentUser.email });
      } else {
        setUser(null);
      }
      setTimeout(() => setIsLoading(false), 2000);
    });
    return () => unsubscribe();
  }, []);

  const handleMenu = () => setMenuVisible(true);
  const closeModal = () => setMenuVisible(false);
  const closeLogout = () => setLogout(false);
  const LogOut = () => {
    setMenuVisible(false);
    setLogout(true);
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({ index: 0, routes: [{ name: 'GetStarted' }] });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
            <View style={styles.headerContent}>
                <View style={styles.skeletonIcon} />
                <View style={[styles.skeletonLine, { width: 80, height: 20, backgroundColor: '#BDBDBD' }]}/>
            </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 80, paddingBottom: 110 }}>
          <HomePageSkeleton />
        </ScrollView>
        <View style={styles.fixedDown}>
          <View style={styles.downnavSkeleton}>
            {[...Array(5)].map((_, i) => <View key={i} style={styles.navItemSkeleton} />)}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleMenu} disabled={isLoading}><Ionicons name="menu" size={26} color="#000" /></TouchableOpacity>
          <Image source={require('../assets/images/logo.png')} style={styles.logoFixed} />
        </View>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal animationType="fade" transparent={true} visible={isLogout} onRequestClose={closeLogout}>
        <View style={styles.modalOverlay}><View style={styles.modalContentLogout}><Text style={styles.logoutText}>Are you sure you want to log out?</Text><View style={styles.logoutButtons}><TouchableOpacity onPress={closeLogout} style={styles.logoutButton}><Text style={styles.logoutButtonText}>Cancel</Text></TouchableOpacity><TouchableOpacity onPress={handleSignOut} style={[styles.logoutButton, styles.logoutButtonConfirm]}><Text style={[styles.logoutButtonText, { color: 'white' }]}>Logout</Text></TouchableOpacity></View></View></View>
      </Modal>

      {/* --- RE-ENGINEERED DRAWER MENU MODAL --- */}
      <Modal animationType="fade" transparent={true} visible={isMenuVisible} onRequestClose={closeModal}>
        <View style={styles.drawerOverlay}>
            <Animatable.View animation="slideInLeft" duration={400} style={styles.acontainer}>
                <View style={styles.aheader}>
                    <TouchableOpacity onPress={closeModal} style={styles.abackIcon}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
                    <View style={styles.aprofileSection}>
                    <Text style={styles.ausername} numberOfLines={1}>{user?.displayName || 'User'}</Text>
                    <Text style={styles.aemail} numberOfLines={1}>{user?.email || 'No email provided'}</Text>
                    </View>
                    <Image source={user?.photoURL ? { uri: user.photoURL } : require('../assets/images/profilepic.jpg')} style={styles.aprofileImage} />
                </View>
                <ScrollView style={styles.amenu}>
                    <DrawerItem icon="home" label="Dashboard/Home" onPress={closeModal} />
                    <DrawerItem icon="id-card" label="Subscription" onPress={() => {}} />
                    <DrawerItem icon="credit-card" label="Payment and Billing" onPress={() => {}} />
                    <DrawerItem icon="help-circle-outline" label="Chat Support/Help" onPress={() => {}} />
                    <DrawerItem icon="settings" label="Settings" onPress={() => {}} />
                </ScrollView>
                <TouchableOpacity style={styles.alogoutButton} onPress={LogOut}>
                    <Feather name="log-out" size={20} color="white" /><Text style={styles.alogoutText}>Logout</Text>
                </TouchableOpacity>
            </Animatable.View>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.drawerBackdrop} />
            </TouchableWithoutFeedback>
        </View>
      </Modal>

      {/* Main content area */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingTop: 80, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          <>
            {/* Welcome Banner */}
            <View style={styles.banner}>
              <Image source={require('../assets/images/home.jpg')} style={styles.bannerImage} />
              <Image source={user?.photoURL ? { uri: user.photoURL } : require('../assets/images/profilepic.jpg')} style={styles.profilePic} />
              <Text style={styles.welcome}>Welcome back, {user?.displayName?.trim().split(' ')[0] || 'User'}!</Text>
              <Text style={{ fontSize: 12, bottom: 55, right: 33, opacity: 0.4 }}>Your account summary</Text>
            </View>
            {/* Account Overview */}
        <View style={styles.accountOverview}>
          <Text style={styles.sectionTitle}>Account Overview</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 12, opacity: 0.5, marginBottom: 20 }}>Quick look at your bills and plans</Text>
            <View style={{ flexDirection: 'row' }}><Image source={require('../assets/images/left.png')} style={[styles.arrowIcon, { top: -10.8 }]} /><Image source={require('../assets/images/right.png')} style={styles.arrowIcon} /></View>
          </View>
          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={true}>
            <View style={[styles.accountDetails, { width: accountDetailsWidth }]}>{accountBoxes.map((box, index) => (<View key={index} style={styles.accountBox}><Text style={styles.accountValue}>{box.title}</Text><Text style={styles.accountLabel}>{box.value}</Text></View>))}</View>
          </ScrollView>
        </View>
            {/* Available Plans */}
            <View style={styles.plansSection}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.PlanTitle}>Available Plans</Text><TouchableOpacity><Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(33, 57, 97, 1)' }}>See More</Text></TouchableOpacity>
              </View>
              {[
                { Image: require('../assets/images/bronze.jpg'), name: 'PLAN BRONZE', value: 'Up to 30mbps', price: '₱700/month' },
                { Image: require('../assets/images/silver.jpg'), name: 'PLAN SILVER', value: 'Up to 35mbps', price: '₱800/month' },
                { Image: require('../assets/images/gold.jpg'), name: 'PLAN GOLD', value: 'Up to 50mbps', price: '₱1,000/month' },
                { Image: require('../assets/images/platinum.jpg'), name: 'PLAN PLATINUM', value: 'Up to 75mbps', price: '₱1,300/month' },
                { Image: require('../assets/images/diamond.jpg'), name: 'PLAN DIAMOND', value: 'Up to 100mbps', price: '₱1,500/month' },
              ].map((plan, index) => (<TouchableOpacity key={index} style={styles.planItem}><Image source={plan.Image} style={{ width: 34, height: 34, marginRight: 10 }} /><View style={{ flex: 1 }}><Text style={styles.planName}>{plan.name}</Text><Text style={styles.planDescription}>{plan.value}</Text></View><Text style={styles.planPrice}>{plan.price}</Text></TouchableOpacity>))}
            </View>
            {/* Bottom Buttons & Feedback */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity>
                <View style={styles.Bills}>
                  <Text style={styles.textBills}> Manage Bills</Text>
                  </View></TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.Bills}>
                  <Text style={styles.textBills}>Pay Bills</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 0, marginTop: 10, }}>
              <Text style={styles.feedbackHeader}>Customer Feedback</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}><View style={styles.card}><View style={styles.rowlogo}><Image style={styles.avatar} source={require('../assets/images/profilepic.jpg')} /><Text style={styles.name}>John D.</Text></View><View style={styles.stars}>{Array.from({ length: 5 }).map((_, i) => (<FontAwesome key={i} name="star" size={16} color="#FFD700" />))}</View><Text style={styles.feedback}>Great service! Always reliable!</Text></View><View style={styles.card}><View style={styles.rowlogo}><Image style={styles.avatar} source={require('../assets/images/profilepic.jpg')} /><Text style={styles.name}>Jane B.</Text></View><View style={styles.stars}>{Array.from({ length: 4 }).map((_, i) => (<FontAwesome key={i} name="star" size={16} color="#FFD700" />))}<FontAwesome name="star-o" size={16} color="#FFD700" /></View><Text style={styles.feedback}>Good service! Minor delay once.</Text></View></View>
              </ScrollView>
            </View>
          </>
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.fixedDown}><View style={styles.downnav}><TouchableOpacity style={styles.navItem}><Entypo name="grid" size={28.56} color="white" /><Text style={styles.navlabel}>Menu</Text></TouchableOpacity><TouchableOpacity style={styles.navItem}><MaterialIcons name="settings" size={28.56} color="white" /><Text style={styles.navlabel}>Settings</Text></TouchableOpacity><TouchableOpacity style={styles.navItem}><Ionicons name="help-circle" size={28.56} color="white" /><Text style={styles.navlabel}>Help</Text></TouchableOpacity><TouchableOpacity style={styles.navItem}><Ionicons name="chatbubble-ellipses" size={28.56} color="white" /><Text style={styles.navlabel}>Chat Support</Text></TouchableOpacity><TouchableOpacity style={styles.navItem}><Ionicons name="person-circle" size={28.56} color="white" /><Text style={styles.navlabel}>Profile</Text></TouchableOpacity></View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  scrollContainer: { flex: 1 },
  fixedHeader: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.08)', zIndex: 10, paddingTop: 40,  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 60, },
  logoFixed: { width: 80, height: 30, resizeMode: 'contain' },
  profilePic: { width: 40, height: 40, right: 130, bottom: 20, marginRight: 12 },
  banner: { alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 10 },
  bannerImage: { width: '100%', height: 350, bottom: 50 },
  arrowIcon: { width: 35, height: 35, bottom: 10 },
  welcome: { fontSize: 16, bottom: 60, right: 10, color: '#444', fontFamily: "Roboto", fontWeight: '700', textAlign: 'left' },
  accountOverview: { marginTop: -20, backgroundColor: '#F4F6F8', paddingVertical: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#294C88', paddingHorizontal: 15, marginBottom: 5 },
  accountDetails: { paddingHorizontal: 15, flexDirection: 'row' },
  accountBox: { backgroundColor: 'rgba(33, 57, 97, 1)', padding: 10, borderRadius: 12, width: 155, height: 96, justifyContent: 'center', alignItems: 'center', marginRight: 10, },
  accountValue: { fontSize: 16, fontWeight: 'bold', color: 'rgba(226, 226, 255, 1)', textAlign: 'center' },
  accountLabel: { fontSize: 12, color: 'rgb(110, 235, 235)' },
  plansSection: { padding: 15, backgroundColor: '#FFFFFF', },
  PlanTitle: { fontSize: 20, fontWeight: 'bold', color: '#294C88', marginBottom: 15 },
  planItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, marginBottom: 10, justifyContent: 'space-between', borderBottomWidth: 2, borderColor: '#DEDEDE' },
  planName: { fontSize: 13, color: '#213961', fontWeight: 'bold' },
  planDescription: { fontSize: 10, color: '#213961', opacity: 0.8 },
  planPrice: { fontSize: 13, color: '#213961', fontWeight: '700' },
  bottomButtons: { padding: 15, alignItems: 'center', backgroundColor: '#FFFFFF' },
  Bills: { backgroundColor: '#FFFFFF', width: 300, height: 47, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#6EA5AA', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)',  },
  textBills: { fontSize: 15, fontWeight: '700', color: '#213961' },
  feedbackHeader: { fontSize: 18, fontWeight: 'bold', color: '#213961', marginBottom: 10, paddingHorizontal: 10 },
  row: { flexDirection: 'row', paddingLeft: 15, paddingBottom: 15 },
  card: { backgroundColor: '#fff', borderColor: '#d1dbe8', borderWidth: 1, boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)', borderRadius: 8, padding: 15, marginRight: 12, width: 220, elevation: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 6 },
  rowlogo: { flexDirection: 'row', gap: 15 },
  name: { fontWeight: 'bold', fontSize: 14, top: 7 },
  stars: { flexDirection: 'row', marginVertical: 4 },
  feedback: { fontSize: 13, color: '#333' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContentLogout: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  logoutText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  logoutButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  logoutButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', width: '45%' },
  logoutButtonConfirm: { backgroundColor: 'red', borderColor: 'red' },
  logoutButtonText: { fontSize: 16, fontWeight: 'bold' },
  fixedDown: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.01)' },
  downnav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#00AAB8', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 40, },
  navItem: { alignItems: 'center', flex: 1},
  navlabel: { color: 'white', fontSize: 10, marginTop: 4},
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row' },
  drawerBackdrop: { flex: 1 },
  acontainer: { flex: 0, backgroundColor: '#fff', width: '85%', maxWidth: 320, borderTopRightRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  aheader: { backgroundColor: '#00A9B5', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 20 },
  abackIcon: { position: 'absolute', top: 60, left: 20, zIndex: 1 },
  aprofileSection: { marginTop: 30, paddingRight: 70 },
  ausername: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  aemail: { color: '#fff', fontSize: 13, marginTop: 2, opacity: 0.9 },
  aprofileImage: { width: 60, height: 60, borderRadius: 30, position: 'absolute', top: 75, right: 20, borderWidth: 2, borderColor: '#fff' },
  amenu: { marginTop: 20, paddingHorizontal: 10 },
  amenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 10 },
  amenuLabel: { fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '500' },
  alogoutButton: { backgroundColor: '#00A9B5', margin: 20, paddingVertical: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  alogoutText: { color: 'white', fontSize: 16, marginLeft: 10, fontWeight: 'bold' },
  skeletonLine: { backgroundColor: '#E0E0E0', borderRadius: 4, height: 12 },
  skeletonBanner: { height: 300, width: '100%', backgroundColor: '#EAECEF', },
  skeletonAccountOverview: { marginTop: -20, backgroundColor: '#F4F6F8', padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, },
  skeletonAccountBox: { width: 155, height: 96, backgroundColor: '#EAECEF', borderRadius: 12, marginRight: 10 },
  skeletonPlanItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, marginBottom: 10, borderRadius: 10 },
  skeletonPlanIcon: { width: 34, height: 34, borderRadius: 4, backgroundColor: '#EAECEF', marginRight: 10 },
  skeletonBottomButtons: { padding: 15, alignItems: 'center', backgroundColor: '#F4F6F8' },
  skeletonBigButton: { width: '100%', height: 47, borderRadius: 15, backgroundColor: '#EAECEF', marginBottom: 10 },
  skeletonCard: { width: 220, height: 110, borderRadius: 8, backgroundColor: '#EAECEF', marginRight: 12 },
  skeletonIcon: { width: 26, height: 26, borderRadius: 5, backgroundColor: '#BDBDBD'},
  downnavSkeleton: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#EAECEF', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 40, height: 57, alignItems: 'center' },
  navItemSkeleton: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#D0D3D4' },
});