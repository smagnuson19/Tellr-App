//
//  ViewController.swift
//  TellrApp
//
//  Created by Hanting Guo on 2/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

class ViewController: UIViewController {
  
  @IBOutlet weak var basketTop: UIImageView!
  @IBOutlet weak var basketBottom: UIImageView!
  
  @IBOutlet weak var picture1: UIImageView!
  @IBOutlet weak var picture2: UIImageView!
  
//  @IBOutlet weak var basketTopConstraint : NSLayoutConstraint!
//  @IBOutlet weak var basketBottomConstraint : NSLayoutConstraint!
//
//  @IBOutlet weak var bug: UIImageView!
  
  var isBugDead = false
  var tap: UITapGestureRecognizer!
  
//  let squishPlayer: AVAudioPlayer
  
  required init?(coder aDecoder: NSCoder) {
//    let squishURL = Bundle.main.url(forResource: "squish", withExtension: "caf")!
//    squishPlayer = try! AVAudioPlayer(contentsOf: squishURL)
//    squishPlayer.prepareToPlay()
    super.init(coder: aDecoder)
//    tap = UITapGestureRecognizer(target: self, action: #selector(ViewController.handleTap(_:)))
  }
  
  override func viewDidAppear(_ animated: Bool) {
//    openBasket()
    openNapkins()
//    moveBugLeft()
//    view.addGestureRecognizer(tap)
  }
  
//  func openBasket() {
//    basketTopConstraint.constant -= basketTop.frame.size.height
//    basketBottomConstraint.constant -= basketBottom.frame.size.height
//
//    UIView.animate(withDuration: 0.7, delay: 1.0, options: .curveEaseOut, animations: {
//      self.view.layoutIfNeeded()
//    }, completion: { finished in
//      print("Basket doors opened!")
//    })
//  }
//
  func openNapkins() {
    UIView.animate(withDuration: 1.0, delay: 1.2, options: .curveEaseOut, animations: {
      var picture1Frame = self.picture1.frame
      picture1Frame.origin.y -= picture1Frame.size.height
      
      var picture2Frame = self.picture2.frame
      picture2Frame.origin.y += picture2Frame.size.height
      
      self.picture1.frame = picture1Frame
      self.picture2.frame = picture2Frame
    }, completion: { finished in
      print("Napkins opened!")
    })
  }
  
//  func moveBugLeft() {
//    if isBugDead { return }
//
//    UIView.animate(withDuration: 1.0,
//                   delay: 2.0,
//                   options: [.curveEaseInOut , .allowUserInteraction],
//                   animations: {
//                    self.bug.center = CGPoint(x: 75, y: 200)
//    },
//                   completion: { finished in
//                    print("Bug moved left!")
//                    self.faceBugRight()
//    })
//  }
//
//  func faceBugRight() {
//    if isBugDead { return }
//
//    UIView.animate(withDuration: 1.0,
//                   delay: 0.0,
//                   options: [.curveEaseInOut , .allowUserInteraction],
//                   animations: {
//                    self.bug.transform = CGAffineTransform(rotationAngle: .pi)
//    },
//                   completion: { finished in
//                    print("Bug faced right!")
//                    self.moveBugRight()
//    })
//  }
//
//  func moveBugRight() {
//    if isBugDead { return }
//
//    UIView.animate(withDuration: 1.0,
//                   delay: 2.0,
//                   options: [.curveEaseInOut , .allowUserInteraction],
//                   animations: {
//                    self.bug.center = CGPoint(x: self.view.frame.width - 75, y: 250)
//    },
//                   completion: { finished in
//                    print("Bug moved right!")
//                    self.faceBugLeft()
//    })
//  }
//
//  func faceBugLeft() {
//    if isBugDead { return }
//
//    UIView.animate(withDuration: 1.0,
//                   delay: 0.0,
//                   options: [.curveEaseInOut , .allowUserInteraction],
//                   animations: {
//                    self.bug.transform = CGAffineTransform(rotationAngle: 0.0)
//    },
//                   completion: { finished in
//                    print("Bug faced left!")
//                    self.moveBugLeft()
//    })
//}
}
